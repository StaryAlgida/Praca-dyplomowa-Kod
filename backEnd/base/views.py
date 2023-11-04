from django.shortcuts import render
from rest_framework import (
    viewsets,
    views,
    status,
    generics,
    mixins,
    authentication,
    permissions,
)
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password

from .serializer import UserSerializer, UpdatePublicUserSerializer
from .models import User
from .validations import validate_password, is_user_exist

# Create your views here.


class RegisterView(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    generics.GenericAPIView,
):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        password = request.data.get("password")
        confirm_password = request.data.get("confirm_password")

        check_password = validate_password(password, confirm_password)
        check_username = is_user_exist(request.data.get("username"))
        if check_password:
            return Response(
                {"error": check_password["error"], "id": check_password["id"]},
                status=400,
            )
        if check_username:
            return Response(
                {"error": check_username["error"], "id": check_username["id"]},
                status=400,
            )

        hash_pasword = make_password(password)
        request.POST._mutable = True
        request.data["password"] = hash_pasword

        self.create(request, *args, **kwargs)
        return Response({"created": "Account created successfully"}, status=201)


class UserUpdatePublicView(generics.GenericAPIView, mixins.UpdateModelMixin):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UpdatePublicUserSerializer

    def put(self, request, *args, **kwargs):
        user = request.data["username"]
        instance = self.queryset.get(username=user)
        serializer = self.serializer_class(
            instance, data=request.data, context={"request": request}
        )

        if serializer.is_valid():
            serializer.update(instance, serializer.validated_data)
            return Response(status=200)

        return Response(status=400)

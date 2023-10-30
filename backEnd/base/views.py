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
from django.contrib.auth.hashers import make_password

from .serializer import UserSerializer
from .models import User
from .validations import validate_password

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

        check = validate_password(password, confirm_password)
        if check:
            return Response({"error": check["error"], "id": check["id"]}, status=400)

        hash_pasword = make_password(password)
        request.POST._mutable = True
        request.data["password"] = hash_pasword

        self.create(request, *args, **kwargs)
        return Response({"created": "Account created successfully"}, status=201)

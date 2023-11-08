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

from .serializer import (
    ChangePasswordSerializer,
    UpdatePrivateInfo,
    UserSerializer,
    UpdatePublicUserSerializer,
)
from .models import User
from .validations import is_email_in_use, is_not_empty, validate_password, is_user_exist

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

        check_is_empty = is_not_empty(request.data)
        if check_is_empty:
            return Response(check_is_empty, status=400)

        check_email = is_email_in_use(request.data.get("email"))
        if check_email:
            return Response(check_email, status=400)

        check_username = is_user_exist(request.data.get("username"))
        if check_username:
            return Response(check_username, status=400)

        check_password = validate_password(password, confirm_password)
        if check_password:
            return Response(check_password, status=400)

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


class UserUpdatePrivateDataView(
    generics.GenericAPIView,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UpdatePrivateInfo

    def put(self, request, *args, **kwargs):
        user = request.user
        instance = self.queryset.get(id=user.id)
        serializer = self.serializer_class(
            instance, data=request.data, context={"request": request}
        )
        if serializer.validate_current_password(request.data.get("password")):
            if serializer.is_valid():
                serializer.save()
                return Response({"response": "Data updated."}, status=200)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordView(
    generics.GenericAPIView,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = ChangePasswordSerializer

    def put(self, request, *args, **kwargs):
        user = request.user
        instance = self.queryset.get(id=user.id)
        serializer = self.serializer_class(
            instance, data=request.data, context={"request": request}
        )

        password = request.data.get("password")
        confirm_password = request.data.get("confirm_password")

        check_password = validate_password(password, confirm_password)
        if check_password:
            return Response(
                {"error": check_password["error"], "id": check_password["id"]},
                status=400,
            )

        if serializer.validate_current_password(request.data.get("old_password")):
            hash_pasword = make_password(request.data.get("password"))
            request.POST._mutable = True
            request.data["password"] = hash_pasword
            request.data.pop("confirm_password")
            request.data.pop("old_password")
            if serializer.is_valid():
                serializer.save()
                return Response({"response": "Password updated."}, status=200)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoggedUserProfileView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()

    def get(self, request, *args, **kwargs):
        user = request.user
        serializer_class = UpdatePublicUserSerializer(user, many=False)
        return Response(serializer_class.data, status=200)

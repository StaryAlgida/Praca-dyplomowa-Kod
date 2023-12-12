from django.shortcuts import render
from django.contrib.auth.hashers import make_password
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
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated

from base.models import User
from base.validations import check_if_empty, is_not_empty, validate_password

from .serializer import (
    UpdatePublicUserSerializer,
    UpdatePrivateInfoSerializer,
    ChangePasswordSerializer,
    LogedUserProfileInfoSerializer,
)


class LoggedUserProfileView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = LogedUserProfileInfoSerializer

    def get(self, request, *args, **kwargs):
        user = request.user
        serializer_class = self.serializer_class(user, many=False)
        return Response(serializer_class.data, status=200)


class UserUpdatePublicView(generics.GenericAPIView, mixins.UpdateModelMixin):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UpdatePublicUserSerializer
    parser_classes = (MultiPartParser,)

    def get(self, request, *args, **kwargs):
        user = request.user
        serializer_class = UpdatePublicUserSerializer(user, many=False)
        return Response(serializer_class.data, status=200)

    def put(self, request, *args, **kwargs):
        user = request.user
        instance = self.queryset.get(id=user.id)
        serializer = self.serializer_class(
            instance, data=request.data, context={"request": request}
        )
        check_is_empty = check_if_empty(request.data)
        if check_is_empty:
            return Response(check_is_empty, status=400)  #

        if serializer.is_valid(raise_exception=True):
            serializer.update(instance, serializer.validated_data)
            return Response({"info": "Data updated."}, status=200)

        return Response(status=status.HTTP_400_BAD_REQUEST)  # serializer.errors,


class UserUpdatePrivateDataView(
    generics.GenericAPIView,
    mixins.UpdateModelMixin,
):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UpdatePrivateInfoSerializer

    def get(self, request, *args, **kwargs):
        user = request.user
        serializer_class = UpdatePrivateInfoSerializer(user, many=False)
        return Response(serializer_class.data, status=200)

    def put(self, request, *args, **kwargs):
        user = request.user
        instance = self.queryset.get(id=user.id)
        serializer = self.serializer_class(
            instance, data=request.data, context={"request": request}
        )

        check_is_empty = is_not_empty(request.data)
        if check_is_empty:
            return Response(check_is_empty, status=400)

        if serializer.validate_current_password(request.data.get("password")):
            serializer.is_valid(raise_exception=True)
            serializer.update(instance, serializer.validated_data)
            return Response({"info": "Data updated."}, status=200)


class ChangePasswordView(
    generics.GenericAPIView,
    mixins.UpdateModelMixin,
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

        check_is_empty = is_not_empty(request.data)
        if check_is_empty:
            return Response(check_is_empty, status=400)

        if serializer.validate_current_password(
            request.data.get("old_password"), request.data.get("password")
        ):
            check_password = validate_password(password, confirm_password)
            if check_password:
                return Response(check_password, status=400)

            hash_pasword = make_password(request.data.get("password"))
            request.POST._mutable = True
            request.data["password"] = hash_pasword
            request.data.pop("confirm_password")
            request.data.pop("old_password")

            serializer.is_valid(raise_exception=True)
            serializer.update(instance, serializer.validated_data)
            return Response({"response": "Password updated."}, status=200)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

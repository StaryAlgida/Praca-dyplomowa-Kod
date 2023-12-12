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
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password

from .serializer import (
    AddSellItemSerializer,
    ChangePasswordSerializer,
    InfoSellItemsSerializer,
    LogedUserProfileInfo,
    TitleOfferSerializer,
    UpdatePrivateInfo,
    UserSerializer,
    UpdatePublicUserSerializer,
)
from .models import SellItems, User
from .validations import (
    check_if_empty,
    is_email_in_use,
    is_not_empty,
    validate_password,
    is_user_exist,
)

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
    serializer_class = UpdatePrivateInfo

    def get(self, request, *args, **kwargs):
        user = request.user
        serializer_class = UpdatePrivateInfo(user, many=False)
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


class LoggedUserProfileView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = LogedUserProfileInfo

    def get(self, request, *args, **kwargs):
        user = request.user
        serializer_class = self.serializer_class(user, many=False)
        return Response(serializer_class.data, status=200)


class UserAddSellItemView(
    generics.GenericAPIView,
    mixins.CreateModelMixin,
):
    permission_classes = [IsAuthenticated]
    queryset = SellItems.objects.all()
    serializer_class = AddSellItemSerializer
    parser_classes = (MultiPartParser,)

    def post(self, request, *args, **kwargs):
        is_empty = check_if_empty(request.data)
        if is_empty:
            return Response(is_empty, status=400)
        request.data["user"] = request.user.id
        return self.create(request, *args, **kwargs)

    def get(self, request, *args, **kwargs):  # all oferts created by user titles only
        user = request.user
        sell_items = self.queryset.filter(user_id=user.id)
        serializer = TitleOfferSerializer(instance=sell_items, many=True)
        return Response(serializer.data, status=200)


class GetFullOfferUpdateDeleteView(
    generics.GenericAPIView, mixins.UpdateModelMixin, mixins.DestroyModelMixin
):
    permission_classes = [IsAuthenticated]
    queryset = SellItems.objects.all()
    serializer_class = InfoSellItemsSerializer
    lookup_url_kwarg = "index"

    def get(self, request, *args, **kwargs):  # info about one offer
        user = request.user
        item_id = kwargs["index"]
        sell_items = self.queryset.filter(user_id=user, id=item_id)
        serializer = self.serializer_class(instance=sell_items, many=True)
        return Response(serializer.data, status=200)

    def put(self, request, *args, **kwargs):  # update offer
        # user = request.user
        # item_id = kwargs["index"]
        # sell_item = self.queryset.get(user_id=user, id=item_id)

        # serializer = self.serializer_class(
        #     instance=sell_item, data=request.data, context={"request": request}
        # )
        # serializer.is_valid(raise_exception=True)
        # serializer.update(sell_item, serializer.validated_data)

        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        # user = request.user
        # item_id = kwargs["index"]
        # sell_item = self.queryset.get(user_id=user, id=item_id)
        # sell_item.delete()
        # return Response("ok", status=200)
        return self.destroy(request, *args, **kwargs)

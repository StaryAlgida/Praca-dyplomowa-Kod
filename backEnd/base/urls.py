from django.urls import path
from .views import (
    ChangePasswordView,
    GetFullOfferUpdateDeleteView,
    AllOffersView,
    RegisterView,
    UserUpdatePrivateDataView,
    UserUpdatePublicView,
    LoggedUserProfileView,
    UserAddSellItemView,
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("profile/updateinfo/", UserUpdatePublicView.as_view(), name="updateprofile"),
    path("profile/info", LoggedUserProfileView.as_view(), name="profileinfo"),
    path(
        "profile/privinfoupdate",
        UserUpdatePrivateDataView.as_view(),
        name="profilepriv",
    ),
    path(
        "profile/passwordupdate", ChangePasswordView.as_view(), name="profilepassword"
    ),
    path("sell/add", UserAddSellItemView.as_view(), name="seladd"),
    path(
        "sell/itemInfo/<int:index>",
        GetFullOfferUpdateDeleteView.as_view(),
        name="sellinfo",
    ),
    path("offers/", AllOffersView.as_view(), name="offers"),
]


# todo add path:
# profile/privinfoupdate
# profile/passwordupdate

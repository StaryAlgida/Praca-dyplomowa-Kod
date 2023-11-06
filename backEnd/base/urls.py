from django.urls import path
from .views import (
    ChangePasswordView,
    RegisterView,
    UserUpdatePrivateDataView,
    UserUpdatePublicView,
    LoggedUserProfileView,
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("profile/updateinfo/", UserUpdatePublicView.as_view(), name="updateprofile"),
    path("profile/info", LoggedUserProfileView.as_view(), name="profile"),
    path("profile/privinfoupdate", UserUpdatePrivateDataView.as_view(), name="profile"),
    path("profile/passwordupdate", ChangePasswordView.as_view(), name="profile"),
]


# todo add path:
# profile/privinfoupdate
# profile/passwordupdate

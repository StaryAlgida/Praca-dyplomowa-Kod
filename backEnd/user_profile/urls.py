from django.urls import path
from .views import (
    LoggedUserProfileView,
    UserUpdatePublicView,
    UserUpdatePrivateDataView,
    ChangePasswordView,
)


urlpatterns = [
    path("", LoggedUserProfileView.as_view(), name="show_profile"),
    path("update/info", UserUpdatePublicView.as_view(), name="public_info_update"),
    path("update/login", UserUpdatePrivateDataView.as_view(), name="show_profile"),
    path("update/password", ChangePasswordView.as_view(), name="show_profile"),
]

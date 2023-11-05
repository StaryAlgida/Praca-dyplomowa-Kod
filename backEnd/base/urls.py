from django.urls import path
from .views import RegisterView, UserUpdatePublicView, LoggedUserProfileView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("profile/updateinfo/", UserUpdatePublicView.as_view(), name="updateprofile"),
    path("profile/info", LoggedUserProfileView.as_view(), name="profile"),
]

from django.urls import path
from .views import RegisterView, UserUpdatePublicView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("profile/updateinfo/", UserUpdatePublicView.as_view(), name="updateprofile"),
]

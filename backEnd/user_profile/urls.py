from django.urls import path
from .views import (
    BuyHistory,
    LoggedUserProfileView,
    SellHistory,
    UserUpdatePublicView,
    UserUpdatePrivateDataView,
    ChangePasswordView,
)


urlpatterns = [
    path("", LoggedUserProfileView.as_view(), name="show_profile"),
    path("update/info", UserUpdatePublicView.as_view(), name="public_info_update"),
    path("update/login", UserUpdatePrivateDataView.as_view(), name="show_profile"),
    path("update/password", ChangePasswordView.as_view(), name="show_profile"),
    path("history/sell", SellHistory.as_view(), name="sell_history"),
    path("history/buy", BuyHistory.as_view(), name="buy_history"),
]

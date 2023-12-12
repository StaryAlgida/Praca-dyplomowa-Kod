from django.urls import path
from .views import (
    GetFullOfferUpdateDeleteView,
    RegisterView,
    UserAddSellItemView,
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("sell/add", UserAddSellItemView.as_view(), name="seladd"),
    path(
        "sell/itemInfo/<int:index>",
        GetFullOfferUpdateDeleteView.as_view(),
        name="sellinfo",
    ),
]

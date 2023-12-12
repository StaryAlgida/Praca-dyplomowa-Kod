from django.urls import path
from .views import (
    AllOffersView,
    OfferView,
)


urlpatterns = [
    path("", AllOffersView.as_view(), name="offers"),
    path("<int:id>/", OfferView.as_view(), name="item-detail"),
]

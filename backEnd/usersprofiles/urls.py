from django.urls import path
from .views import GetProfileInfoView, GetUserOffers


urlpatterns = [
    path("<str:username>/", GetProfileInfoView.as_view(), name="show_profile"),
    path("<str:username>/items/", GetUserOffers.as_view(), name="show_profile"),
]

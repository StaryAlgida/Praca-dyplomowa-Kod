from django.shortcuts import get_object_or_404, render
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
from offers.pagination import OffersPagination

from base.models import SellItems, User

from .serializer import ItemsSerializer, PublicInfoSerializer


class GetProfileInfoView(generics.RetrieveAPIView, mixins.RetrieveModelMixin):
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()
    serializer_class = PublicInfoSerializer
    lookup_field = "username"


class GetUserOffers(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ItemsSerializer
    pagination_class = OffersPagination
    lookup_field = "username"

    def get_queryset(self):
        queryset = SellItems.objects.all()
        user = get_object_or_404(User, username=self.kwargs.get("username"))
        return queryset.filter(user=user)

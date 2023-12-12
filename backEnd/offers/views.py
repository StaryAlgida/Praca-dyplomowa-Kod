from django.shortcuts import render
from rest_framework import (
    viewsets,
    views,
    status,
    generics,
    mixins,
    authentication,
    permissions,
)
from .serializer import (
    OfferInfoSerializer,
    OffersSerializer,
)
from .pagination import OffersPagination
from base.models import SellItems


class AllOffersView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    pagination_class = OffersPagination
    serializer_class = OffersSerializer
    queryset = SellItems.objects.all()


class OfferView(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = OfferInfoSerializer
    queryset = SellItems.objects.all()
    lookup_field = "id"

from django.shortcuts import render
from django.core.exceptions import FieldError
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


class OfferCategoryView(generics.ListAPIView):
    serializer_class = OffersSerializer
    pagination_class = OffersPagination

    def get_queryset(self):
        category = self.kwargs["category"]
        field_lookup = {f"{category}": True}
        return SellItems.objects.filter(**field_lookup)

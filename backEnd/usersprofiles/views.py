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
from rest_framework.response import Response

from base.models import SellItems, User

from .serializer import ItemsSerializer, PublicInfoSerializer


class GetProfileInfoView(generics.RetrieveAPIView, mixins.RetrieveModelMixin):
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()
    serializer_class = PublicInfoSerializer
    lookup_field = "username"


class GetUserOffers(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ItemsSerializer
    queryset = SellItems.objects.all()
    lookup_field = "username"

    def get(self, request, *args, **kwargs):  # info about one offer
        username = kwargs["username"]
        user_id = (
            User.objects.filter(username=username).values_list("id", flat=True).first()
        )
        user_items = self.queryset.filter(user=user_id)
        serializer = self.serializer_class(instance=user_items, many=True)
        return Response(serializer.data, status=200)

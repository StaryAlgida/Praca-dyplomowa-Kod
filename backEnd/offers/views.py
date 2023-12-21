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
from rest_framework.permissions import IsAuthenticated
from .serializer import (
    AddressSerializer,
    HistorySerializer,
    ItemSellInfoSerializer,
    OfferInfoSerializer,
    OffersSerializer,
    UpdateItemSerializer,
)
from .pagination import OffersPagination
from base.models import Address, SellItems

from django.shortcuts import get_object_or_404


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


class BuyItemView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    lookup_field = "id"

    def post(self, request, *args, **kwargs):
        data = request.data
        address = data.copy()
        del address["amount"]
        del address["item_id"]

        # get item to sell
        item = get_object_or_404(SellItems, id=kwargs.get("id"))
        item_serializer = ItemSellInfoSerializer(item)

        # checks whether it is too much
        if (
            int(data["amount"]) <= 0
            and int(data["amount"]) > item_serializer.data["quantity"]
        ):
            return Response({"error": "Wrong quantity or item sold out."}, status=404)
        # print(item_serializer.data["user"])
        # print(request.user.id)

        # checks is address data valid
        address_serializer = AddressSerializer(data=address)
        if address_serializer.is_valid():
            print("zapisany")
            address_serializer.save()
        else:
            print(address_serializer.errors)
            return Response(address_serializer.errors, status=404)

        address_id = address_serializer.instance.id

        history_data = {
            "seller_id": item_serializer.data["user"],
            "buyer_id": request.user.id,
            "shipping_id": address_id,
            "item_id": item_serializer.data["id"],
            "price": item_serializer.data["price"],
            "quantity": data["amount"],
        }
        print("history_data: ", history_data)

        history_serializer = HistorySerializer(data=history_data)
        if history_serializer.is_valid():
            quantity = {
                "quantity": item_serializer.data["quantity"] - int(data["amount"])
            }
            update = UpdateItemSerializer(item, data=quantity)
            if update.is_valid():
                update.save()
                history_serializer.save()
            else:
                print(update.errors)
                address_to_delete = get_object_or_404(Address, id=address_id)
                address_to_delete.delete()
        else:
            print(history_serializer.errors)
            address_to_delete = get_object_or_404(Address, id=address_id)
            address_to_delete.delete()
            return Response(history_serializer.errors, status=404)

        return Response("The order was placed correctly.", status=200)

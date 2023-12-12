from rest_framework import serializers
from base.models import SellItems


class OffersSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")
    company_name = serializers.CharField(source="user.company_name")

    class Meta:
        ordering = ["id"]
        model = SellItems
        fields = [
            "username",
            "company_name",
            "id",
            "title",
            "electronics",
            "fashion",
            "home_garden",
            "automotive",
            "health_beauty",
            "price",
            "picture",
        ]


class OfferInfoSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")
    company_name = serializers.CharField(source="user.company_name")

    class Meta:
        model = SellItems
        fields = [
            "username",
            "company_name",
            "id",
            "title",
            "electronics",
            "fashion",
            "home_garden",
            "automotive",
            "health_beauty",
            "price",
            "quantity",
            "picture",
            "description",
        ]

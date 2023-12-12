from rest_framework import serializers
from base.models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "password"]
        extra_kwargs = {
            "password": {"write_only": True},
        }


class AddSellItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellItems
        fields = "__all__"

    def create(self, validated_data):
        user = validated_data.get("user")
        sellItems = SellItems.objects.create(**validated_data)
        return sellItems

    def validate(self, data):
        fields = [
            "electronics",
            "fashion",
            "home_garden",
            "automotive",
            "health_beauty",
            "picture",
        ]
        not_null = 0
        for field in fields:
            if data.get(field) is not False:
                not_null += 1
                break
        if not_null == 0:
            raise serializers.ValidationError(
                {"error": "Category are required.", "id": 1}
            )
        if data.get("picture") == "":
            raise serializers.ValidationError(
                {"error": "Picture are required.", "id": 4}
            )
        return data


class InfoSellItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellItems
        fields = [
            "title",
            "electronics",
            "fashion",
            "home_garden",
            "automotive",
            "health_beauty",
            "price",
            "quantity",
            "description",
        ]


class TitleOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = SellItems
        fields = ["id", "title"]


# class OffertsInfoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = SellItems
#         fields = [
#             "id",
#             "title",
#             "electronics",
#             "fashion",
#             "home_garden",
#             "automotive",
#             "health_beauty",
#             "price",
#         ]

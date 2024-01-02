from rest_framework import serializers

from base.models import SellItems, User


class PublicInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "username",
            "id",
            "company_name",
            "first_name",
            "last_name",
            "contact_email",
            "phone_number",
            "profile_picture",
        ]


class ItemsSerializer(serializers.ModelSerializer):
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

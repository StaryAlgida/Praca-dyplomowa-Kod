from rest_framework import serializers
from base.models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "password"]
        extra_kwargs = {
            "password": {"write_only": True},
        }


class UpdatePublicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "company_name",
            "first_name",
            "last_name",
            "contact_email",
            "phone_number",
            "profile_picture",
        ]

    def update(self, instance, data):
        for field, value in data.items():
            if value != "" and value != None:
                setattr(instance, field, value)
        instance.save()
        return instance


class LogedUserProfileInfo(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "company_name",
            "first_name",
            "last_name",
            "contact_email",
            "phone_number",
            "profile_picture",
        ]


class UpdatePrivateInfo(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "username"]

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)

    def validate_current_password(self, value):
        user = self.context["request"].user
        if not user.check_password(value):
            raise serializers.ValidationError(
                {"error": "Incorect password.", "id": [-2]}
            )
        return value


class ChangePasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["password"]
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)

    def validate_current_password(self, value1, value2):
        user = self.context["request"].user
        if not user.check_password(value1):
            raise serializers.ValidationError(
                {"error": "Old password is incorrect.", "id": [-2]}
            )
        if value1 == value2:
            raise serializers.ValidationError(
                {"error": "The old and new password are the same.", "id": [0, 1, 2]}
            )
        return value1


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

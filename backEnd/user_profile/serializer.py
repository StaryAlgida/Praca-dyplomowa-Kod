from rest_framework import serializers
from base.models import BuySellItemHistory, User


class LogedUserProfileInfoSerializer(serializers.ModelSerializer):
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


class UpdatePrivateInfoSerializer(serializers.ModelSerializer):
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


class SellHistorySerializer(serializers.ModelSerializer):
    title = serializers.CharField(source="item_id.title")

    class Meta:
        model = BuySellItemHistory
        fields = [
            "title",
            "price",
            "quantity",
            "date",
            "shipping_id",
            "buyer_id",
            "item_id",
        ]


class BuyHistorySerializer(serializers.ModelSerializer):
    title = serializers.CharField(source="item_id.title")

    class Meta:
        model = BuySellItemHistory
        fields = [
            "title",
            "price",
            "quantity",
            "date",
            "shipping_id",
            "seller_id",
            "item_id",
        ]

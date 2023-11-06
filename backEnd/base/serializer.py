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
        ]

    def update(self, instance, data):
        print(data)
        for field, value in data.items():
            if value != "":
                setattr(instance, field, value)
        instance.save()
        return instance


class UpdatePrivateInfo(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "username"]

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)

    def validate_current_password(self, value):
        user = self.context["request"].user
        if not user.check_password(value):
            raise serializers.ValidationError("Current password is incorrect.")
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

    def validate_current_password(self, value):
        user = self.context["request"].user
        if not user.check_password(value):
            raise serializers.ValidationError("Current password is incorrect.")
        return value

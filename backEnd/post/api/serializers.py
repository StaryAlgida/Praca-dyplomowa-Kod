from rest_framework.serializers import ModelSerializer
from ..models import Users


class PostSerializer(ModelSerializer):
    class Meta:
        model = Users
        fields = ("id", "email", "name", "password", "wallet")

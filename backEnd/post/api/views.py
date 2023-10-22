from rest_framework.viewsets import ModelViewSet
from ..models import Users
from .serializers import PostSerializer


class PostViewSet(ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = PostSerializer

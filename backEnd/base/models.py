from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    username = models.CharField(unique=True, max_length=100)
    email = models.EmailField(unique=True, max_length=100)
    wallet = models.FloatField(default=0.0)
    company_name = models.CharField(max_length=200, null=True, blank=True)

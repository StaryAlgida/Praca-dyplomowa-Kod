from django.db import models
from django.contrib.auth.hashers import make_password

# Create your models here.


class Users(models.Model):
    email = models.EmailField(max_length=200, unique=True)
    name = models.CharField(max_length=200, unique=True)
    password = models.CharField(max_length=128)
    wallet = models.FloatField(default=0)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def cheack_password(self, raw_password):
        hash_passowrd = make_password(raw_password)
        return self.password == hash_passowrd

    # title = models.CharField(max_length=200)
    # body = models.TextField()

    # def __str__(self) -> str:
    #     return f"Post: {self.title}"

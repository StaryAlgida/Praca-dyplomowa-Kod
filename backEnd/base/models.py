from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
from django.conf import settings


def profile_img(instance, filename):
    return f"profile_pictures/prof_{instance.id}.{filename.split('.')[-1]}"


def product_img(instance, filename):
    return f"products_pictures/pic_{instance.id}.{filename.split('.')[-1]}"


class User(AbstractUser):
    email = models.EmailField(unique=True, max_length=100)
    username = models.CharField(unique=True, max_length=100)

    wallet = models.FloatField(default=0.0)

    company_name = models.CharField(max_length=200, null=True, blank=True)
    first_name = models.CharField(max_length=100, null=True, blank=True)
    last_name = models.CharField(max_length=100, null=True, blank=True)
    contact_email = models.EmailField(null=True, blank=True)
    phone_number = PhoneNumberField(default=None, null=True, blank=True)
    profile_picture = models.ImageField(
        upload_to=profile_img,
        blank=False,
        null=True,
        default="defaults/default_user.png",
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]


class SellItems(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=300, null=False, blank=False)

    electronics = models.BooleanField(default=False)
    fashion = models.BooleanField(default=False)
    home_garden = models.BooleanField(default=False)
    automotive = models.BooleanField(default=False)
    health_beauty = models.BooleanField(default=False)

    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField(default=0)
    picture = models.ImageField(
        upload_to=product_img,
        blank=False,
        null=True,
        default="defaults/default_product.png",
    )
    description = models.TextField(max_length=1000)
    is_deleted = models.BooleanField(default=False)
    # def save(self, *args, **kwargs):
    #     super().save(*args, **kwargs)


class Address(models.Model):
    COUNTRY_CHOICES = [("PL", "Poland"), ("EN", "England"), ("USA", "USA")]

    first_name = models.CharField(max_length=30, null=False, blank=False)
    last_name = models.CharField(max_length=30, null=False, blank=False)

    phone_number = models.CharField(max_length=30, null=False, blank=False)

    country = models.CharField(
        max_length=40, choices=COUNTRY_CHOICES, null=False, blank=False
    )

    street_address = models.CharField(max_length=50, null=False, blank=False)
    city = models.CharField(max_length=30, null=False, blank=False)
    region = models.CharField(max_length=30, null=False, blank=False)
    zip_code = models.CharField(max_length=10, null=False, blank=False)
    house_premises_num = models.CharField(max_length=10, null=False, blank=False)


class BuySellItemHistory(models.Model):
    seller_id = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="seller_history"
    )
    buyer_id = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="buyer_history"
    )
    shipping_id = models.ForeignKey(Address, on_delete=models.CASCADE)
    item_id = models.ForeignKey(SellItems, on_delete=models.CASCADE)

    price = models.FloatField(null=False, blank=False)
    quantity = models.IntegerField(null=False, blank=False)
    date = models.DateTimeField(auto_now_add=True)

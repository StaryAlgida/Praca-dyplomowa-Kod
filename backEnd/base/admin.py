from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, SellItems, Address, BuySellItemHistory

admin.site.register(User, UserAdmin)
admin.site.register(SellItems)
admin.site.register(Address)
admin.site.register(BuySellItemHistory)

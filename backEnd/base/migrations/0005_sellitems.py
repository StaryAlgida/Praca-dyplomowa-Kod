# Generated by Django 4.2.7 on 2023-11-13 01:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_user_contact_email_user_phone_number_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='SellItems',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=300)),
                ('electronics', models.BooleanField(default=False)),
                ('fashion', models.BooleanField(default=False)),
                ('home_garden', models.BooleanField(default=False)),
                ('automotive', models.BooleanField(default=False)),
                ('health_beauty', models.BooleanField(default=False)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('quantity', models.IntegerField(default=0)),
                ('description', models.TextField(max_length=1000)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

# Generated by Django 4.2.7 on 2023-11-20 17:32

import base.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0005_sellitems'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='profile_picture',
            field=models.ImageField(default='defaults/default_user.png', null=True, upload_to=base.models.profile_img),
        ),
    ]

# Generated by Django 5.0 on 2024-01-27 07:19

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('globals', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assetfile',
            name='category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='files', to='globals.assetscategory', verbose_name='الفئة'),
        ),
    ]

# Generated by Django 5.0 on 2024-03-09 09:17

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('points', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pointsadding',
            name='cause',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='points.pointsaddingcause', verbose_name='السبب'),
        ),
    ]

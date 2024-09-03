# Generated by Django 5.0 on 2024-09-01 15:25

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('points', '0002_alter_pointsadding_cause'),
        ('students', '0011_alter_memorizemessage_master_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='pointsadding',
            name='master',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='اسم الأستاذ'),
        ),
        migrations.AlterField(
            model_name='pointsadding',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='students.student', verbose_name='الطالب'),
        ),
        migrations.AlterField(
            model_name='pointsdeleting',
            name='master',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='اسم الأستاذ'),
        ),
        migrations.AlterField(
            model_name='pointsdeleting',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='students.student', verbose_name='الطالب'),
        ),
    ]

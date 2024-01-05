# Generated by Django 5.0 on 2024-01-05 14:37

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('students', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ComingCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=40, verbose_name='الفئة')),
                ('points', models.IntegerField(default=10, verbose_name='قيمة النقاط')),
            ],
            options={
                'verbose_name': 'سبب الحضور',
                'verbose_name_plural': 'أسباب الحضور',
            },
        ),
        migrations.CreateModel(
            name='Coming',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('registered_at', models.DateTimeField(auto_now_add=True, verbose_name='تاريخ التسجيل')),
                ('is_doubled', models.BooleanField(default=False, verbose_name='القيمة مضاعفة')),
                ('master', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='اسم الأستاذ')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='students.student', verbose_name='اسم الطالب')),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='comings.comingcategory', verbose_name='سبب الحضور')),
            ],
            options={
                'verbose_name': 'تسجيل حضور',
                'verbose_name_plural': 'تسجيلات الحضور',
            },
        ),
    ]

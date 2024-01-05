# Generated by Django 5.0 on 2024-01-05 14:37

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('students', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='MoneyDeletingCause',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=80, verbose_name='الاسم')),
            ],
            options={
                'verbose_name': 'سبب غرامة',
                'verbose_name_plural': 'أسباب الغرامات',
            },
        ),
        migrations.CreateModel(
            name='MoneyDeleting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='تاريخ التسجيل')),
                ('active_to_points', models.BooleanField(default=True, verbose_name='مخصومة من النقاط')),
                ('value', models.IntegerField(verbose_name='القيمة')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='students.student', verbose_name='الاسم')),
                ('cause', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='money.moneydeletingcause', verbose_name='سبب الغرامة')),
            ],
            options={
                'verbose_name': 'غرامة',
                'verbose_name_plural': 'الغرامات',
            },
        ),
    ]

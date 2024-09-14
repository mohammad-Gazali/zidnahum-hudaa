# Generated by Django 5.0 on 2024-09-01 15:25

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('money', '0002_alter_moneydeleting_cause'),
        ('students', '0011_alter_memorizemessage_master_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='moneydeleting',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='students.student', verbose_name='الاسم'),
        ),
    ]
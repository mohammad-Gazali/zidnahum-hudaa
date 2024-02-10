# Generated by Django 5.0 on 2024-02-05 16:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('money', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='moneydeleting',
            name='cause',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='money.moneydeletingcause', verbose_name='سبب الغرامة'),
        ),
    ]
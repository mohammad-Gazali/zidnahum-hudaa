# Generated by Django 5.0 on 2024-02-02 18:26

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0002_student_masjed'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='alarbaein_alnawawia_new',
            field=models.PositiveIntegerField(default=0, validators=[django.core.validators.MaxValueValidator(50)], verbose_name='الأربعين النووية جديد'),
        ),
        migrations.AlterField(
            model_name='student',
            name='alarbaein_alnawawia_old',
            field=models.PositiveIntegerField(default=0, validators=[django.core.validators.MaxValueValidator(50)], verbose_name='الأربعين النووية قديم'),
        ),
        migrations.AlterField(
            model_name='student',
            name='riad_alsaalihin_new',
            field=models.PositiveIntegerField(default=0, verbose_name='رياض الصالحين جديد'),
        ),
        migrations.AlterField(
            model_name='student',
            name='riad_alsaalihin_old',
            field=models.PositiveIntegerField(default=0, verbose_name='رياض الصالحين قديم'),
        ),
    ]

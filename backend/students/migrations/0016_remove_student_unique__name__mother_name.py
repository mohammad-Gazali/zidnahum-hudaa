# Generated by Django 5.0 on 2024-09-14 00:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0015_alter_student_mother_name'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='student',
            name='unique__name__mother_name',
        ),
    ]

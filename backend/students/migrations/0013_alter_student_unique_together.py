# Generated by Django 5.0 on 2024-09-13 17:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0012_memorizemessage_student_level_student_level_and_more'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='student',
            unique_together={('name', 'mother_name')},
        ),
    ]

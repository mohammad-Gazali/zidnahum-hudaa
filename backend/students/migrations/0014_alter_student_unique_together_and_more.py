# Generated by Django 5.0 on 2024-09-13 23:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0013_alter_student_unique_together'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='student',
            unique_together=set(),
        ),
        migrations.AddConstraint(
            model_name='student',
            constraint=models.UniqueConstraint(fields=('name', 'mother_name'), name='unique__name__mother_name'),
        ),
    ]

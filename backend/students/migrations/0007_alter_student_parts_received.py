# Generated by Django 5.0 on 2024-03-08 13:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0006_alter_student_parts_received'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='parts_received',
            field=models.CharField(blank=True, max_length=50, null=True, verbose_name='الأجزاء المستلمة'),
        ),
    ]
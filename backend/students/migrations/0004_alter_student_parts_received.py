# Generated by Django 5.0 on 2024-02-02 18:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0003_alter_student_alarbaein_alnawawia_new_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='parts_received',
            field=models.CharField(blank=True, default='', max_length=50, verbose_name='الأجزاء المستلمة'),
        ),
    ]

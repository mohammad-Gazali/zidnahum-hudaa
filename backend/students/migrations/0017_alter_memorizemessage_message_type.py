# Generated by Django 5.0 on 2025-03-01 00:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0016_remove_student_unique__name__mother_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='memorizemessage',
            name='message_type',
            field=models.IntegerField(choices=[(1, 'تسميع'), (2, 'سبر'), (3, 'أربعين نووية'), (4, 'رياض الصالحين'), (5, 'أسماء الله الحسنى'), (6, 'سبر الأحزاب')], default=1, verbose_name='نوع الرسالة'),
        ),
    ]

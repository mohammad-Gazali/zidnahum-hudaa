# Generated by Django 5.0 on 2024-09-10 19:22

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0011_alter_memorizemessage_master_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='memorizemessage',
            name='student_level',
            field=models.IntegerField(choices=[(1, 'مستوى أول'), (2, 'مستوى ثاني'), (3, 'مستوى ثالث')], default=1, verbose_name='مستوى الطالب'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='student',
            name='level',
            field=models.IntegerField(choices=[(1, 'مستوى أول'), (2, 'مستوى ثاني'), (3, 'مستوى ثالث')], default=1, verbose_name='مستوى الطالب'),
        ),
        migrations.AlterField(
            model_name='memorizemessage',
            name='master',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='الأستاذ'),
        ),
        migrations.AlterField(
            model_name='memorizemessage',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='students.student', verbose_name='الطالب'),
        ),
    ]

# Generated by Django 5.0 on 2024-01-05 14:37

import students.utils
import django.core.validators
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=80, verbose_name='الاسم الثلاثي')),
                ('mother_name', models.CharField(blank=True, max_length=30, null=True, verbose_name='اسم الأم')),
                ('birthdate', models.DateField(blank=True, null=True, verbose_name='تاريخ الميلاد')),
                ('address', models.CharField(blank=True, max_length=80, null=True, verbose_name='العنوان تفصيلاً')),
                ('static_phone', models.CharField(blank=True, max_length=10, null=True, verbose_name='الهاتف الأرضي')),
                ('cell_phone', models.CharField(blank=True, max_length=25, null=True, verbose_name='الجوال')),
                ('father_phone', models.CharField(blank=True, max_length=25, null=True, verbose_name='جوال الأب')),
                ('mother_phone', models.CharField(blank=True, max_length=25, null=True, verbose_name='جوال الأم')),
                ('registered_at', models.DateField(auto_now_add=True, verbose_name='تاريخ التسجيل')),
                ('father_work', models.CharField(blank=True, max_length=80, null=True, verbose_name='عمل الأب')),
                ('notes', models.CharField(blank=True, max_length=60, null=True, verbose_name='ملاحظات')),
                ('bring_him', models.CharField(blank=True, max_length=80, null=True, verbose_name='أحضره')),
                ('parts_received', models.CharField(default='', max_length=50, verbose_name='الأجزاء المستلمة')),
                ('q_memorizing', models.JSONField(default=students.utils.json_default_value_618, verbose_name='حفظ القرآن')),
                ('q_test', models.JSONField(default=students.utils.json_default_value_240, verbose_name='السبر في المسجد')),
                ('q_awqaf_test', models.JSONField(default=students.utils.json_default_value_30, verbose_name='سبر القرآن في الأوقاف')),
                ('q_awqaf_test_looking', models.JSONField(default=students.utils.json_default_value_30, verbose_name='سبر القرآن نظراً في الأوقاف')),
                ('q_awqaf_test_explaining', models.JSONField(default=students.utils.json_default_value_30, verbose_name='سبر القرآن تفسيراً في الأوقاف')),
                ('alarbaein_alnawawia_old', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)], verbose_name='الأربعين النووية قديم')),
                ('alarbaein_alnawawia_new', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)], verbose_name='الأربعين النووية جديد')),
                ('riad_alsaalihin_old', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)], verbose_name='رياض الصالحين قديم')),
                ('riad_alsaalihin_new', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)], verbose_name='رياض الصالحين جديد')),
                ('allah_names_old', models.BooleanField(default=False, verbose_name='أسماء الله الحسنى قديم')),
                ('allah_names_new', models.BooleanField(default=False, verbose_name='أسماء الله الحسنى جديد')),
            ],
            options={
                'verbose_name': 'طالب',
                'verbose_name_plural': 'الطلاب',
            },
        ),
        migrations.CreateModel(
            name='StudentCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=40, unique=True, verbose_name='الاسم')),
            ],
            options={
                'verbose_name': 'فئة الطلاب',
                'verbose_name_plural': 'فئات الطلاب',
            },
        ),
        migrations.CreateModel(
            name='StudentGroup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=40, unique=True, verbose_name='الاسم')),
            ],
            options={
                'verbose_name': 'مجموعة الطلاب',
                'verbose_name_plural': 'مجموعات الطلاب',
            },
        ),
        migrations.CreateModel(
            name='MemorizeNotes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.CharField(max_length=60, verbose_name='المحتوى')),
                ('sended_at', models.DateTimeField(auto_now_add=True, verbose_name='تاريخ الإرسال')),
                ('master', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='الأستاذ')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='students.student', verbose_name='اسم الطالب')),
            ],
            options={
                'verbose_name': 'ملاحظة تسميع',
                'verbose_name_plural': 'ملاحظات التسميع',
            },
        ),
        migrations.CreateModel(
            name='MemorizeMessage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sended_at', models.DateTimeField(auto_now_add=True, verbose_name='تاريخ الإرسال')),
                ('changes', models.JSONField(default=list, verbose_name='التعديلات')),
                ('message_type', models.IntegerField(choices=[(1, 'تسميع'), (2, 'سبر'), (3, 'أربعين نووية'), (4, 'رياض الصالحين'), (5, 'أسماء الله الحسنى')], default=1, verbose_name='نوع الرسالة')),
                ('is_doubled', models.BooleanField(default=False, verbose_name='القيمة مضاعفة')),
                ('master', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='اسم الأستاذ')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='students.student', verbose_name='اسم الطالب')),
            ],
            options={
                'verbose_name': 'رسالة تسميع',
                'verbose_name_plural': 'رسائل التسميع',
            },
        ),
        migrations.AddField(
            model_name='student',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='students.studentcategory', verbose_name='الفئة'),
        ),
        migrations.AddField(
            model_name='student',
            name='group',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='students.studentgroup', verbose_name='المجموعة'),
        ),
    ]

from django.db import models
from django.core.validators import MaxValueValidator
from django.core.exceptions import ValidationError
from django.conf.global_settings import AUTH_USER_MODEL
from students.utils import json_default_value_618, json_default_value_240, json_default_value_60, json_default_value_30
import re


class StudentCategory(models.Model):
    name = models.CharField(max_length=40, unique=True, verbose_name="الاسم")

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name = "فئة الطلاب"
        verbose_name_plural = "فئات الطلاب"


class StudentGroup(models.Model):
    name = models.CharField(max_length=40, unique=True, verbose_name="الاسم")

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name = "مجموعة الطلاب"
        verbose_name_plural = "مجموعات الطلاب"


class StudentMasjedChoice(models.IntegerChoices):
    HASANIN = 1, "الحسنين"
    SALAM = 2, "السلام"
    QAZZAZ = 3, "القزاز"
    

class Student(models.Model):
    name = models.CharField(max_length=80, verbose_name="الاسم الثلاثي")
    mother_name = models.CharField(max_length=30, verbose_name="اسم الأم", null=True, blank=True)
    birthdate = models.DateField(verbose_name="تاريخ الميلاد", null=True, blank=True)
    address = models.CharField(max_length=80, verbose_name="العنوان تفصيلاً", null=True, blank=True)
    static_phone = models.CharField(max_length=10, verbose_name="الهاتف الأرضي", null=True, blank=True)
    cell_phone = models.CharField(max_length=25, verbose_name="الجوال", null=True, blank=True)
    father_phone = models.CharField(max_length=25, verbose_name="جوال الأب", null=True, blank=True)
    mother_phone = models.CharField(max_length=25, verbose_name="جوال الأم", null=True, blank=True)
    registered_at = models.DateField(verbose_name="تاريخ التسجيل", auto_now_add=True)
    father_work = models.CharField(max_length=80, null=True, blank=True, verbose_name="عمل الأب")
    notes = models.CharField(max_length=60, null=True, blank=True, verbose_name="ملاحظات")
    bring_him = models.CharField(max_length=80, verbose_name="أحضره", null=True, blank=True)
    parts_received = models.CharField(max_length=50, verbose_name="الأجزاء المستلمة", null=True, blank=True)
    
    q_memorizing = models.JSONField(default=json_default_value_618, verbose_name="حفظ القرآن")
    q_test = models.JSONField(default=json_default_value_240, verbose_name="السبر في المسجد")
    q_elite_test = models.JSONField(default=json_default_value_60, verbose_name="السبر النوعي في المسجد")
    q_awqaf_test = models.JSONField(default=json_default_value_30, verbose_name="سبر القرآن في الأوقاف")
    q_awqaf_test_looking = models.JSONField(default=json_default_value_30, verbose_name="سبر القرآن نظراً في الأوقاف")
    q_awqaf_test_explaining = models.JSONField(default=json_default_value_30, verbose_name="سبر القرآن تفسيراً في الأوقاف")
    
    alarbaein_alnawawia_old = models.PositiveIntegerField(verbose_name="الأربعين النووية قديم", default=0, validators=[MaxValueValidator(50)])
    alarbaein_alnawawia_new = models.PositiveIntegerField(verbose_name="الأربعين النووية جديد", default=0, validators=[MaxValueValidator(50)])
    riad_alsaalihin_old = models.PositiveIntegerField(verbose_name="رياض الصالحين قديم", default=0)
    riad_alsaalihin_new = models.PositiveIntegerField(verbose_name="رياض الصالحين جديد", default=0)
    allah_names_old = models.BooleanField(verbose_name="أسماء الله الحسنى قديم", default=False)
    allah_names_new = models.BooleanField(verbose_name="أسماء الله الحسنى جديد", default=False)
    
    category = models.ForeignKey(StudentCategory, on_delete=models.SET_NULL, verbose_name="الفئة", null=True, blank=True)
    group = models.ForeignKey(StudentGroup, on_delete=models.SET_NULL, verbose_name="المجموعة", null=True, blank=True)

    masjed = models.IntegerField(verbose_name="المسجد", choices=StudentMasjedChoice.choices)

    def __str__(self) -> str:
        return self.name


    @classmethod
    def search_student_regex(cls, text: str) -> str:
        # here we search by regex
        regex = ""

        # looping over words and replace each  "ا"  "أ"  "إ"  by union of them
        # and escape characters for safety purpose
        for word in re.split(r"\s+", text.strip()):
            if word == "": continue
            regex += (
                re.escape(word)
                .replace("\u0623", "(\u0623|\u0625|\u0627)")
                .replace("\u0625", "(\u0623|\u0625|\u0627)")
                .replace("\u0627", "(\u0623|\u0625|\u0627)")
            ) + r".*"
        
        return regex

    @classmethod
    def search_student(cls, text: str):
        try:
            # if the input is a valid number then we search by id
            pk = int(text)
            return cls.objects.filter(pk=pk)

        except ValueError:
            return cls.objects.filter(
                name__iregex="{}".format(cls.search_student_regex(text))
            )


    def clean(self):
        if self.alarbaein_alnawawia_new + self.alarbaein_alnawawia_old > 50:
            raise ValidationError("sum of alarbaein_alnawawia_new and alarbaein_alnawawia_old must be less than or equal to 50")


    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "طالب"
        verbose_name_plural = "الطلاب"


class MemorizeNotes(models.Model):
    master = models.ForeignKey(AUTH_USER_MODEL, verbose_name="الأستاذ", on_delete=models.CASCADE, null=True)
    content = models.CharField(max_length=60, verbose_name="المحتوى")
    student = models.ForeignKey(Student, on_delete=models.CASCADE, verbose_name="اسم الطالب", related_name="memo_notes")
    sended_at = models.DateTimeField(auto_now_add=True, verbose_name="تاريخ الإرسال")

    def __str__(self):
        return f"ملاحظة  ({self.id})"

    class Meta:
        verbose_name = "ملاحظة تسميع"
        verbose_name_plural = "ملاحظات التسميع"


class MessageTypeChoice(models.IntegerChoices):
    MEMO = 1, "تسميع"
    TEST = 2, "سبر"
    ALNAWAWIA = 3, "أربعين نووية"
    ALSAALIHIN = 4, "رياض الصالحين"
    ALLAH_NAMES = 5, "أسماء الله الحسنى"


class MemorizeMessage(models.Model):
    master = models.ForeignKey(AUTH_USER_MODEL, verbose_name="اسم الأستاذ", on_delete=models.CASCADE, null=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, verbose_name="اسم الطالب")
    sended_at = models.DateTimeField(auto_now_add=True, verbose_name="تاريخ الإرسال")

    # for type MEMO, TEST the changes is the "list" of changed indexes in the related field
    # for type ALNAWAWIA, ALSAALIHIN the changes is the "list" of three numbers where the first item is the old value of the related field and the second is the new value before edit and the third is the new value after edit
    # for type ALLAH_NAMES the changes is empty list
    changes = models.JSONField(default=list, verbose_name="التعديلات")

    message_type = models.IntegerField(verbose_name="نوع الرسالة", choices=MessageTypeChoice.choices, default=MessageTypeChoice.MEMO)
    is_doubled = models.BooleanField(verbose_name="القيمة مضاعفة", default=False)
    

    def __str__(self):
        return f"رسالة التسميع {self.id}"

    class Meta:
        verbose_name = "رسالة تسميع"
        verbose_name_plural = "رسائل التسميع"
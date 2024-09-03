from django.db import models
from django.core.validators import MinValueValidator
from django.conf.global_settings import AUTH_USER_MODEL


class PointsAddingCause(models.Model):
    name = models.CharField(max_length=40, verbose_name="الاسم")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "سبب إضافة"
        verbose_name_plural = "أسباب الإضافة"


class PointsAdding(models.Model):
    master = models.ForeignKey(AUTH_USER_MODEL, verbose_name="اسم الأستاذ", on_delete=models.SET_NULL, null=True)
    student = models.ForeignKey("students.Student", on_delete=models.PROTECT, verbose_name="الطالب")
    value = models.IntegerField(verbose_name="القيمة", validators=[MinValueValidator(0)])
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاريخ الإضافة")
    cause = models.ForeignKey(PointsAddingCause, verbose_name="السبب", on_delete=models.PROTECT)

    def __str__(self):
        return f"إضافة نقاط {self.id}"

    class Meta:
        verbose_name = "إضافة نقاط"
        verbose_name_plural = "إضافات النقاط"


class PointsDeletingCause(models.Model):
    name = models.CharField(max_length=40, verbose_name="الاسم")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "سبب حذف"
        verbose_name_plural = "أسباب الحذف"


class PointsDeleting(models.Model):
    master = models.ForeignKey(AUTH_USER_MODEL, verbose_name="اسم الأستاذ", on_delete=models.SET_NULL, null=True)
    student = models.ForeignKey("students.Student", on_delete=models.PROTECT, verbose_name="الطالب")
    value = models.IntegerField(verbose_name="القيمة", validators=[MinValueValidator(0)])
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاريخ الإضافة")
    cause = models.ForeignKey(PointsDeletingCause, verbose_name="السبب", on_delete=models.PROTECT, null=True, blank=True)

    def __str__(self):
        return f"حذف نقاط {self.id}"

    class Meta:
        verbose_name = "حذف نقاط"
        verbose_name_plural = "حذف النقاط"
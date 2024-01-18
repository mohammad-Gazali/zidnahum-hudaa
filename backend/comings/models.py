from django.db import models
from django.conf.global_settings import AUTH_USER_MODEL


class ComingCategory(models.Model):
    name = models.CharField(max_length=40, verbose_name="الفئة")
    points = models.IntegerField(verbose_name="قيمة النقاط", default=10)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "سبب الحضور"
        verbose_name_plural = "أسباب الحضور"


class Coming(models.Model):
    master = models.ForeignKey(AUTH_USER_MODEL, verbose_name="اسم الأستاذ", on_delete=models.CASCADE, null=True)
    student = models.ForeignKey("students.Student", verbose_name="اسم الطالب", on_delete=models.CASCADE)
    registered_at = models.DateTimeField(auto_now_add=True, verbose_name="تاريخ التسجيل")
    category = models.ForeignKey(ComingCategory, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="سبب الحضور")
    is_doubled = models.BooleanField(verbose_name="القيمة مضاعفة", default=False)

    def __str__(self):
        return f"تسجيل حضور {self.id}"

    class Meta:
        verbose_name = "تسجيل حضور"
        verbose_name_plural = "تسجيلات الحضور"
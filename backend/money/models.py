from django.db import models


class MoneyDeletingCause(models.Model):
    name = models.CharField(max_length=80, verbose_name="الاسم")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "سبب غرامة"
        verbose_name_plural = "أسباب الغرامات"


class MoneyDeleting(models.Model):
    student = models.ForeignKey("students.Student", on_delete=models.CASCADE, verbose_name="الاسم")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="تاريخ التسجيل")
    cause = models.ForeignKey(MoneyDeletingCause, on_delete=models.PROTECT, verbose_name="سبب الغرامة")
    active_to_points = models.BooleanField(verbose_name="مخصومة من النقاط", default=True)
    value = models.IntegerField(verbose_name="القيمة")

    def __str__(self):
        return f"غرامة {self.id}"

    class Meta:
        verbose_name = "غرامة"
        verbose_name_plural = "الغرامات"
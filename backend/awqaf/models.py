from django.db import models


class AwqafTestNoQ(models.Model):
    name = models.CharField(max_length=80, verbose_name="الاسم")
    points = models.IntegerField(verbose_name="النقاط")

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name = "سبر أوقاف بغير القرآن"
        verbose_name_plural = "سبر الأوقاف بغير القرآن"


class AwqafNoQStudentRelation(models.Model):
    test = models.ForeignKey(AwqafTestNoQ, on_delete=models.PROTECT)
    student = models.ForeignKey("students.Student", on_delete=models.PROTECT)
    is_old = models.BooleanField(default=False)

    class Meta:
        unique_together = ["test", "student"]
        verbose_name = "سبر الطالب بالأوقاف بغير القرآن"
        verbose_name_plural = "سبر الطلاب بالأوقاف بغير القرآن"

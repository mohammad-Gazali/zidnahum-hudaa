from django.db import models
from students.models import StudentMasjedChoice

class AssetsCategory(models.Model):
    name = models.CharField(max_length=255, verbose_name="الاسم")

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name = "فئة ملفات"
        verbose_name_plural = "فئات الملفات"


class AssetFile(models.Model):
    name = models.CharField(max_length=255, verbose_name="الاسم")
    category = models.ForeignKey(AssetsCategory, on_delete=models.PROTECT, verbose_name="الفئة", related_name="files")
    file = models.FileField(upload_to="assets", verbose_name="الملف")

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name = "ملف للتحميل"
        verbose_name_plural = "ملفات للتحميل"


class News(models.Model):
    title = models.CharField(max_length=255, verbose_name="الاسم")
    description = models.TextField(verbose_name="الوصف", null=True, blank=True)
    low_quality_image = models.ImageField(upload_to="news_low_quality", verbose_name="صورة بدقة منخفضة")
    main_image = models.ImageField(upload_to="news_main", verbose_name="الصورة الرئيسية")
    masjed = models.IntegerField(choices=StudentMasjedChoice.choices)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "إعلان"
        verbose_name_plural = "إعلانات"
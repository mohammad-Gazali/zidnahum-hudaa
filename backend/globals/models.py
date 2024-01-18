from django.db import models


class AssetsCategory(models.Model):
    name = models.CharField(max_length=255, verbose_name="الاسم")

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name = "فئة ملفات"
        verbose_name_plural = "فئات الملفات"


class AssetFile(models.Model):
    name = models.CharField(max_length=255, verbose_name="الاسم")
    category = models.ForeignKey(AssetsCategory, on_delete=models.PROTECT, verbose_name="الفئة")
    file = models.FileField(upload_to="assets", verbose_name="الملف")

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name = "ملف للتحميل"
        verbose_name_plural = "ملفات للتحميل"
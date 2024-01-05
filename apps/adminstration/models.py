from django.db import models


class ControlSettings(models.Model):
    double_points = models.BooleanField(default=False, verbose_name="مضاعفة النقاط")
    point_value = models.IntegerField(verbose_name="قيمة النقطة")
    event_title = models.CharField(max_length=511, verbose_name="عنوان الحدث", null=True)
    hidden_ids = models.JSONField(verbose_name="المعرفات المخفية", default=list)

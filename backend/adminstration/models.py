from django.db import models


class ControlSettings(models.Model):
    double_points = models.BooleanField(default=False, verbose_name="مضاعفة النقاط")
    point_value = models.IntegerField(verbose_name="قيمة النقطة")
    event_title = models.CharField(max_length=511, verbose_name="عنوان الحدث", null=True)
    hidden_ids = models.JSONField(verbose_name="المعرفات المخفية", default=list)

    @classmethod
    def get_double_points(cls):
        return cls.objects.first().double_points

    @classmethod
    def get_point_value(cls):
        return cls.objects.first().point_value

    @classmethod
    def get_event_title(cls):
        return cls.objects.first().event_title

    @classmethod
    def get_hidden_ids(cls):
        return cls.objects.first().hidden_ids
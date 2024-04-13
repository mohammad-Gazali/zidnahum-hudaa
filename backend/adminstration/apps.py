from django.apps import AppConfig
from django.db.models.signals import post_migrate


class AdminstrationConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "adminstration"
    verbose_name = "الإدارة"

    def ready(self):
        post_migrate.connect(self.post_migrate_receiver, self)

    def post_migrate_receiver(self, **kwargs):
        from adminstration.models import ControlSettings

        if not ControlSettings.objects.first():
            ControlSettings.objects.create(point_value=0)
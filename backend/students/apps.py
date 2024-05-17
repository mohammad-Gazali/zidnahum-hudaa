from django.apps import AppConfig
from django.db.models.signals import post_migrate
from students import constants

class StudentsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "students"
    verbose_name = "الطلاب"

    def ready(self):
        import students.signals as _
        post_migrate.connect(self.post_migrate_receiver, self)


    def post_migrate_receiver(self, **kwargs):
        from django.contrib.auth.models import Group
        Group.objects.get_or_create(id=1, name=constants.MEMO_GROUP)
        Group.objects.get_or_create(id=2, name=constants.COMING_GROUP)
        Group.objects.get_or_create(id=3, name=constants.POINTS_GROUP)
        Group.objects.get_or_create(id=4, name=constants.HADEETH_GROUP)
        Group.objects.get_or_create(id=5, name=constants.REPORTS_GROUP)
from django.core.management.base import BaseCommand
from django.db import connection
from students.constants import NEW, OLD
from students.models import Student, MemorizeMessage
from comings.models import Coming
from points.models import PointsAdding, PointsDeleting
from money.models import MoneyDeleting
from awqaf.models import AwqafNoQStudentRelation
from typing import List

class Command(BaseCommand):
  help = "Reset database data for new year"

  def handle(self, *args, **options):
    Coming.objects.all().delete()
    PointsAdding.objects.all().delete()
    PointsDeleting.objects.all().delete()
    MoneyDeleting.objects.all().delete()

    # avoid signals
    with connection.cursor() as cursor:
      cursor.execute(f"DELETE FROM {MemorizeMessage._meta.db_table}")

    for relation in AwqafNoQStudentRelation.objects.all():
      relation.is_old = True
      relation.save()

    for student in Student.objects.all():
      if student.mother_name is None:
        continue

      student.bring_him = None

      student.alarbaein_alnawawia_old = student.alarbaein_alnawawia_old + student.alarbaein_alnawawia_new
      student.alarbaein_alnawawia_new = 0

      student.riad_alsaalihin_old = student.riad_alsaalihin_old + student.riad_alsaalihin_new
      student.riad_alsaalihin_new = 0

      if student.allah_names_new:
        student.allah_names_old = True
        student.allah_names_new = False

      student.q_memorizing = make_array_old(student.q_memorizing)
      student.q_test = make_array_old(student.q_test)
      student.q_awqaf_test = make_array_old(student.q_awqaf_test)
      student.q_awqaf_test_looking = make_array_old(student.q_awqaf_test_looking)
      student.q_awqaf_test_explaining = make_array_old(student.q_awqaf_test_explaining)
      student.q_elite_test = make_array_old(student.q_elite_test)

      student.save()


def make_array_old(array: List[int]):
  return list(map(lambda x: OLD if x == NEW else x, array))
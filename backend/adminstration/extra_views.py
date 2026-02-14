from typing import Any, List, Dict

from awqaf.models import AwqafNoQStudentRelation
from django.core.exceptions import ValidationError as DjangoValidationError
from django.db import transaction
from django.db.models import Sum
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import OpenApiParameter, extend_schema
from money.models import MoneyDeleting
from rest_framework.exceptions import ValidationError
from rest_framework.filters import OrderingFilter
from rest_framework.generics import CreateAPIView, ListAPIView, UpdateAPIView
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.status import (
  HTTP_200_OK,
  HTTP_201_CREATED,
  HTTP_204_NO_CONTENT,
  HTTP_400_BAD_REQUEST,
)
from rest_framework.views import APIView
from students.constants import NEW, NON, OLD
from students.models import MemorizeMessage, MessageTypeChoice, Student

from adminstration.extra_serializers import (
  AddAwqafTestNoQRequestSerailizer,
  AddAwqafTestQRequestSerializer,
  AddEliteTestSerializer,
  AddMoneyDeletingCategoryRequestSerailizer,
  AddMoneyDeletingNormalRequestSerailizer,
  ControlSettingsSerializer,
  StatisticsRequestSerializer,
  StatisticsResponseSerializer,
  StudentUpdateSerializer,
  StudentUpdateSuperAdminSerializer,
  TotalMoneyListSerializer,
)
from adminstration.extra_utils import (
  get_active_students,
  get_students_awqaf_test,
  get_students_awqaf_test_explaining,
  get_students_awqaf_test_looking,
  get_students_memo,
  get_students_test,
)
from adminstration.models import ControlSettings
from adminstration.permissions import IsSuperUser

# this is a query param for any model has student field and need to filter by it
param_student_name = OpenApiParameter(
  name="student__name",
  location=OpenApiParameter.QUERY,
  type=str,
  description="param for filtering result via student name or student id",
)


class StudentUpdateView(UpdateAPIView):
  permission_classes = [IsAdminUser]
  queryset = Student.objects.all()

  def handle_exception(self, exc):

    if isinstance(exc, ValidationError):
      return Response({"detail": exc.detail}, status=HTTP_400_BAD_REQUEST)

    if isinstance(exc, DjangoValidationError):
      if len(exc.messages):
        return Response({"detail": exc.messages[0]}, status=HTTP_400_BAD_REQUEST)

    return super().handle_exception(exc)

  def get_serializer_class(self):
    return (
      StudentUpdateSuperAdminSerializer
      if self.request.user.is_superuser
      else StudentUpdateSerializer
    )


class AddAwqafNoQTestCreateView(CreateAPIView):
  permission_classes = [IsAdminUser]
  serializer_class = AddAwqafTestNoQRequestSerailizer

  def perform_create(self, serializer):
    for suid in serializer.validated_data["students"]:
      AwqafNoQStudentRelation.objects.get_or_create(
        student_id=suid,
        test_id=serializer.validated_data["test"],
      )


class AddAwqafQTestCreateView(CreateAPIView):
  permission_classes = [IsAdminUser]
  serializer_class = AddAwqafTestQRequestSerializer

  def perform_create(self, serializer):
    test_type = serializer.validated_data["type"]
    parts = serializer.validated_data["parts"]

    for suid in serializer.validated_data["students"]:
      student = get_object_or_404(Student, pk=suid)

      if test_type == "normal":
        for part in parts:
          if student.q_awqaf_test[part] != OLD:
            student.q_awqaf_test[part] = NEW

      elif test_type == "looking":
        for part in parts:
          if student.q_awqaf_test_looking[part] != OLD:
            student.q_awqaf_test_looking[part] = NEW

      else:
        for part in parts:
          if student.q_awqaf_test_explaining[part] != OLD:
            student.q_awqaf_test_explaining[part] = NEW

      student.save()


class AddMoneyDeletingNormalCreateView(CreateAPIView):
  permission_classes = [IsSuperUser]
  serializer_class = AddMoneyDeletingNormalRequestSerailizer

  def perform_create(self, serializer):
    for suid in serializer.validated_data["students"]:
      MoneyDeleting.objects.create(
        student_id=suid,
        cause_id=serializer.validated_data["cause"],
        value=serializer.validated_data["value"],
      )


class AddMoneyDeletingCategoryCreateView(CreateAPIView):
  permission_classes = [IsSuperUser]
  serializer_class = AddMoneyDeletingCategoryRequestSerailizer

  def perform_create(self, serializer):
    category_id = serializer.validated_data["category"]
    masjed = serializer.validated_data["masjed"]
    students = Student.objects.filter(category_id=category_id, masjed=masjed)

    for s in students:
      MoneyDeleting.objects.create(
        student=s,
        cause_id=serializer.validated_data["cause"],
        value=serializer.validated_data["value"],
      )


class ControlSettingsReadUpdateView(APIView):
  permission_classes = [IsSuperUser]
  http_method_names = ["get", "put"]

  @extend_schema(responses={HTTP_200_OK: ControlSettingsSerializer})
  def get(self, *args, **kwargs):
    serializer = ControlSettingsSerializer(ControlSettings.objects.first())
    return Response(data=serializer.data, status=HTTP_200_OK)

  @extend_schema(request=ControlSettingsSerializer)
  @transaction.atomic
  def put(self, *args, **kwargs):
    serializer = ControlSettingsSerializer(data=self.request.data)

    if serializer.is_valid():
      settings = ControlSettings.objects.first()
      if settings:
        settings.double_points = serializer.validated_data["double_points"]
        settings.point_value = serializer.validated_data["point_value"]
        settings.event_title = serializer.validated_data["event_title"]
        settings.hidden_ids = serializer.validated_data["hidden_ids"]

        settings.save()

      return Response(status=HTTP_204_NO_CONTENT)

    return Response({"detail": serializer.errors}, HTTP_400_BAD_REQUEST)


class TotalMoneyListView(ListAPIView):
  permission_classes = [IsSuperUser]
  pagination_class = LimitOffsetPagination
  filter_backends = [DjangoFilterBackend, OrderingFilter]
  serializer_class = TotalMoneyListSerializer
  ordering_fields = "__all__"

  def handle_exception(self, exc):
    if isinstance(exc, ValidationError):
      return Response({"detail": exc.detail}, status=HTTP_400_BAD_REQUEST)

    return super().handle_exception(exc)

  def get_queryset(self):
    name = self.request.GET.get("student__name")
    masjed = self.request.GET.get("student__masjed")

    query_kwargs = (
      {"student__name__iregex": Student.search_student_regex(name)} if name else {}
    )
    masjed_kwargs = {"student__masjed": int(masjed)} if masjed else {}

    return (
      MoneyDeleting.objects.filter(active_to_points=True)
      .filter(**query_kwargs)
      .filter(**masjed_kwargs)
      .select_related("student")
      .values("student")
      .annotate(sum=Sum("value"))
      .values("student__id", "student__name", "sum")
      .order_by("student__id")
    )

  @extend_schema(parameters=[param_student_name])
  def list(self, request, *args, **kwargs):
    return super().list(request, *args, **kwargs)


class StatisticsView(APIView):
  permission_classes = [IsSuperUser]
  http_method_names = ["post"]

  @extend_schema(
    request=StatisticsRequestSerializer,
    responses={
      HTTP_200_OK: StatisticsResponseSerializer,
    },
  )
  def post(self, *args, **kwargs):
    serializer = StatisticsRequestSerializer(data=self.request.data)

    if serializer.is_valid():
      start_date = serializer.validated_data.get("start_date", None)
      end_date = serializer.validated_data.get("end_date", None)
      memo = serializer.validated_data["memo"]
      test = serializer.validated_data["test"]
      awqaf_test = serializer.validated_data["awqaf_test"]
      awqaf_test_looking = serializer.validated_data["awqaf_test_looking"]
      awqaf_test_explaining = serializer.validated_data["awqaf_test_explaining"]
      active_students = serializer.validated_data["active_students"]

      result_dict: Dict[str, Any] = {
        "memo": None,
        "test": None,
        "awqaf_test": None,
        "awqaf_test_looking": None,
        "awqaf_test_explaining": None,
        "active_students": None,
      }

      if memo:
        result_dict["memo"] = get_students_memo(start_date, end_date)

      if test:
        result_dict["test"] = list(
          map(lambda x: x / 20, get_students_test(start_date, end_date))
        )

      if awqaf_test:
        result_dict["awqaf_test"] = get_students_awqaf_test()

      if awqaf_test_looking:
        result_dict["awqaf_test_looking"] = get_students_awqaf_test_looking()

      if awqaf_test_explaining:
        result_dict["awqaf_test_explaining"] = get_students_awqaf_test_explaining()

      if active_students:
        result_dict["active_students"] = get_active_students(start_date, end_date)

      return Response(result_dict, HTTP_200_OK)

    return Response({"detail": serializer.errors}, HTTP_400_BAD_REQUEST)


class AddEliteTestCreateView(APIView):
  permission_classes = [IsAdminUser]
  http_method_names = ["post"]

  @extend_schema(request=AddEliteTestSerializer)
  def post(self, *args, **kwargs):
    serializer = AddEliteTestSerializer(data=self.request.data)

    if serializer.is_valid():
      student = get_object_or_404(Student, pk=serializer.validated_data["student"])

      new_q_elite_test_parts: List[int] = list(set(serializer.validated_data["parts"]))
      repeated_parts = []
      added_parts = []

      new_q_elite_test_parts.sort()

      for item in new_q_elite_test_parts:
        if student.q_elite_test[item] != NON:
          repeated_parts.append(item)
        else:
          added_parts.append(item)
          student.q_elite_test[item] = NEW

      student.save()

      MemorizeMessage.objects.create(
        master=self.request.user,
        student=student,
        changes=added_parts,
        message_type=MessageTypeChoice.ELITE_TEST,
        is_doubled=ControlSettings.get_double_points(),
        student_level=student.level,
      )

      return Response(
        {
          "repeated_parts": repeated_parts,
        },
        HTTP_201_CREATED,
      )

    return Response({"detail": serializer.errors}, HTTP_400_BAD_REQUEST)

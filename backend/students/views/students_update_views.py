from typing import List

from adminstration.models import ControlSettings
from django.core.exceptions import ValidationError as DjangoValidationError
from django.db import transaction
from django.shortcuts import get_object_or_404
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import OpenApiExample, OpenApiResponse, extend_schema
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView

from students.constants import NEW, NON
from students.models import (
  MemorizeMessage,
  MessageTypeChoice,
  Student,
  StudentLevelChoice,
)
from students.permissions import IsHadeethGroup, IsMemoGroup
from students.serializers import (
  StudentUpdateAlarbaeinAlnawawiaSerializer,
  StudentUpdatePartsReceivedSerializer,
  StudentUpdateQMemoSerializer,
  StudentUpdateQTestSerializer,
  StudentUpdateRiadAlsaalihinSerializer,
)
from students.utils import check_for_qtest, check_for_qmemo


class HandledExceptionAPIView(APIView):
  def handle_exception(self, exc):

    if isinstance(exc, ValidationError):
      return Response({"detail": exc.detail}, status=HTTP_400_BAD_REQUEST)

    if isinstance(exc, DjangoValidationError):
      if len(exc.messages):
        return Response({"detail": exc.messages[0]}, status=HTTP_400_BAD_REQUEST)

    return super().handle_exception(exc)


class StudentUpdateQMemoView(HandledExceptionAPIView):
  permission_classes = [IsMemoGroup]
  http_method_names = ["put"]

  @extend_schema(
    request=StudentUpdateQMemoSerializer,
    responses={
      200: OpenApiResponse(
        description="success",
        response=OpenApiTypes.OBJECT,
        examples=[
          OpenApiExample(
            "Example",
            value={
              "repeated_memo": [10, 12, 13, 20, 200],
            },
          )
        ],
      ),
      400: OpenApiResponse(
        description="error",
        response=OpenApiTypes.OBJECT,
        examples=[
          OpenApiExample(
            "Example",
            value={
              "detail": "error message here"
            }
          )
        ]
      )
    },
  )
  @transaction.atomic
  def put(self, *args, **kwargs):
    pk: int = kwargs.get("pk")
    student: Student = get_object_or_404(Student, pk=pk)

    serializer = StudentUpdateQMemoSerializer(data=self.request.data)

    if serializer.is_valid():
      new_qmemo: List[int] = list(set(serializer.validated_data["q_memo"]))
      repeated_memo = []
      added_memo = []

      new_qmemo.sort()

      for item in new_qmemo:
        if student.q_memorizing[item] != NON:
          repeated_memo.append(item)
        else:
          added_memo.append(item)

      if result := check_for_qmemo(student, added_memo):
        return Response({"detail": result}, HTTP_400_BAD_REQUEST)

      for item in added_memo:
        student.q_memorizing[item] = NEW

      student.save()

      if added_memo:
        MemorizeMessage.objects.create(
          master=self.request.user,
          student=student,
          changes=added_memo,
          message_type=MessageTypeChoice.MEMO,
          is_doubled=ControlSettings.get_double_points(),
          student_level=student.level,
        )

      return Response(
        {
          "repeated_memo": repeated_memo,
        },
        HTTP_200_OK,
      )

    return Response({"detail": serializer.errors}, HTTP_400_BAD_REQUEST)


class StudentUpdateQTestView(HandledExceptionAPIView):
  permission_classes = [IsMemoGroup]
  http_method_names = ["put"]

  @extend_schema(
    request=StudentUpdateQTestSerializer,
    responses={
      200: OpenApiResponse(
        description="success",
        response=OpenApiTypes.OBJECT,
        examples=[
          OpenApiExample(
            "Example",
            value={
              "repeated_test": [10, 12, 13, 20, 36],
            },
          )
        ],
      ),
    },
  )
  @transaction.atomic
  def put(self, *args, **kwargs):
    pk: int = kwargs.get("pk")
    student: Student = get_object_or_404(Student, pk=pk)

    serializer = StudentUpdateQTestSerializer(data=self.request.data)

    if serializer.is_valid():
      new_qtest: List[int] = list(set(serializer.validated_data["q_test"]))
      repeated_test = []
      added_test = []

      new_qtest.sort()

      for item in new_qtest:
        if student.q_test[item] != NON:
          repeated_test.append(item)
        else:
          added_test.append(item)

      if result := check_for_qtest(student, added_test):
        return Response({"detail": result}, HTTP_400_BAD_REQUEST)

      for item in added_test:
        student.q_test[item] = NEW

      student.save()

      if added_test:
        MemorizeMessage.objects.create(
          master=self.request.user,
          student=student,
          changes=added_test,
          message_type=MessageTypeChoice.TEST,
          is_doubled=ControlSettings.get_double_points(),
          student_level=student.level,
        )

      return Response(
        {
          "repeated_test": repeated_test,
        },
        HTTP_200_OK,
      )

    return Response({"detail": serializer.errors}, HTTP_400_BAD_REQUEST)


class StudentUpdateAlarbaeinAlnawawiaView(HandledExceptionAPIView):
  permission_classes = [IsHadeethGroup]
  http_method_names = ["put"]

  @extend_schema(request=StudentUpdateAlarbaeinAlnawawiaSerializer)
  @transaction.atomic
  def put(self, *args, **kwargs):
    pk: int = kwargs.get("pk")
    student: Student = get_object_or_404(Student, pk=pk)

    serializer = StudentUpdateAlarbaeinAlnawawiaSerializer(data=self.request.data)

    if serializer.is_valid():
      value: int = serializer.validated_data["value"]

      if student.alarbaein_alnawawia_old + student.alarbaein_alnawawia_new < value:
        new_value = value - student.alarbaein_alnawawia_old

        MemorizeMessage.objects.create(
          master=self.request.user,
          student=student,
          changes=[
            student.alarbaein_alnawawia_old,
            student.alarbaein_alnawawia_new,
            new_value,
          ],
          message_type=MessageTypeChoice.ALNAWAWIA,
          is_doubled=ControlSettings.get_double_points(),
          student_level=StudentLevelChoice.ONE,
        )

        student.alarbaein_alnawawia_new = new_value
        student.save()

        return Response(status=HTTP_204_NO_CONTENT)

      else:
        return Response({"detail": "هذا الحديث مسمع مسبقاً"}, HTTP_400_BAD_REQUEST)

    return Response({"detail": serializer.errors}, HTTP_400_BAD_REQUEST)


class StudentUpdateRiadAlsaalihinView(HandledExceptionAPIView):
  permission_classes = [IsHadeethGroup]
  http_method_names = ["put"]

  @extend_schema(request=StudentUpdateRiadAlsaalihinSerializer)
  @transaction.atomic
  def put(self, *args, **kwargs):
    pk: int = kwargs.get("pk")
    student: Student = get_object_or_404(Student, pk=pk)

    serializer = StudentUpdateRiadAlsaalihinSerializer(data=self.request.data)

    if serializer.is_valid():
      value: int = serializer.validated_data["value"]

      if student.riad_alsaalihin_old + student.riad_alsaalihin_new < value:
        new_value = value - student.riad_alsaalihin_old

        MemorizeMessage.objects.create(
          master=self.request.user,
          student=student,
          changes=[student.riad_alsaalihin_old, student.riad_alsaalihin_new, new_value],
          message_type=MessageTypeChoice.ALSAALIHIN,
          is_doubled=ControlSettings.get_double_points(),
          student_level=StudentLevelChoice.ONE,
        )

        student.riad_alsaalihin_new = new_value
        student.save()

        return Response(status=HTTP_204_NO_CONTENT)

      else:
        return Response({"detail": "هذا الحديث مسمع مسبقاً"}, HTTP_400_BAD_REQUEST)

    return Response({"detail": serializer.errors}, HTTP_400_BAD_REQUEST)


class StudentUpdateAllahNamesView(HandledExceptionAPIView):
  permission_classes = [IsHadeethGroup]
  http_method_names = ["put"]

  @transaction.atomic
  def put(self, *args, **kwargs):
    pk: int = kwargs.get("pk")
    student: Student = get_object_or_404(Student, pk=pk)

    if student.allah_names_old or student.allah_names_new:
      return Response(
        {"detail": "الطالب سمع أسماء الله الحسنى سابقاً"}, HTTP_400_BAD_REQUEST
      )

    student.allah_names_new = True
    student.save()

    MemorizeMessage.objects.create(
      master=self.request.user,
      student=student,
      changes=[],
      message_type=MessageTypeChoice.ALLAH_NAMES,
      is_doubled=ControlSettings.get_double_points(),
      student_level=StudentLevelChoice.ONE,
    )

    return Response(status=HTTP_204_NO_CONTENT)


class StudentUpdatePartsReceivedView(HandledExceptionAPIView):
  permission_classes = [IsMemoGroup]
  http_method_names = ["put"]

  @extend_schema(request=StudentUpdatePartsReceivedSerializer)
  def put(self, *args, **kwargs):
    pk: int = kwargs.get("pk")
    student: Student = get_object_or_404(Student, pk=pk)

    serializer = StudentUpdatePartsReceivedSerializer(data=self.request.data)

    if serializer.is_valid():
      student.parts_received = serializer.validated_data["parts_received"]
      student.save()

      return Response(status=HTTP_204_NO_CONTENT)

    return Response({"detail": serializer.errors}, HTTP_400_BAD_REQUEST)

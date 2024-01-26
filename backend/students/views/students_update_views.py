from django.db import transaction
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST
from students.models import Student, MemorizeMessage, MessageTypeChoice
from students.serializers import StudentUpdateQMemoSerializer, StudentUpdateQTestSerializer, StudentUpdateAlarbaeinAlnawawiaSerializer, StudentUpdateRiadAlsaalihinSerializer, StudentUpdatePartsReceivedSerializer
from students.constants import NON, NEW
from adminstration.models import ControlSettings
from typing import List


class StudentUpdateQMemoView(APIView):
    permission_classes = [IsAuthenticated]
    http_method_names = ["put"]

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
                    student.q_memorizing[item] = NEW

            student.save()

            MemorizeMessage.objects.create(
                master=self.request.user,
                student=student,
                changes=added_memo,
                message_type=MessageTypeChoice.MEMO,
                is_doubled=ControlSettings.get_double_points(),
            )

            return Response({
                "repeated_memo": repeated_memo,
            }, HTTP_200_OK)

        return Response({"detail": serializer.errors}, HTTP_400_BAD_REQUEST)


class StudentUpdateQTestView(APIView):
    permission_classes = [IsAuthenticated]
    http_method_names = ["put"]

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
                    student.q_test[item] = NEW

            student.save()

            MemorizeMessage.objects.create(
                master=self.request.user,
                student=student,
                changes=added_test,
                message_type=MessageTypeChoice.TEST,
                is_doubled=ControlSettings.get_double_points(),
            )

            return Response({
                "repeated_test": repeated_test,
            }, HTTP_200_OK)

        return Response({"detail": serializer.errors}, HTTP_400_BAD_REQUEST)


class StudentUpdateAlarbaeinAlnawawiaView(APIView):
    permission_classes = [IsAuthenticated]
    http_method_names = ["put"]

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
                    changes=[student.alarbaein_alnawawia_old, student.alarbaein_alnawawia_new, new_value],
                    message_type=MessageTypeChoice.ALNAWAWIA,
                    is_doubled=ControlSettings.get_double_points(),
                )

                student.alarbaein_alnawawia_new = new_value
                student.save()

                return Response(status=HTTP_204_NO_CONTENT)

            else:
                return Response({"detail": "invalid hadeeth number"}, HTTP_400_BAD_REQUEST)

        return Response({"detail": serializer.errors}, HTTP_400_BAD_REQUEST)


class StudentUpdateRiadAlsaalihinView(APIView):
    permission_classes = [IsAuthenticated]
    http_method_names = ["put"]

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
                )

                student.riad_alsaalihin_new = new_value
                student.save()

                return Response(status=HTTP_204_NO_CONTENT)

            else:
                return Response({"detail": "invalid hadeeth number"}, HTTP_400_BAD_REQUEST)

        return Response({"detail": serializer.errors}, HTTP_400_BAD_REQUEST)


class StudentUpdateAllahNamesView(APIView):
    permission_classes = [IsAuthenticated]
    http_method_names = ["put"]

    @transaction.atomic
    def put(self, *args, **kwargs):
        pk: int = kwargs.get("pk")
        student: Student = get_object_or_404(Student, pk=pk)

        if student.allah_names_old or student.allah_names_new:
            return Response({"detail": "student already has allah names memorized"}, HTTP_400_BAD_REQUEST)

        student.allah_names_new = True
        student.save()

        MemorizeMessage.objects.create(
            master=self.request.user,
            student=student,
            changes=[],
            message_type=MessageTypeChoice.ALLAH_NAMES,
            is_doubled=ControlSettings.get_double_points(),
        )

        return Response(status=HTTP_204_NO_CONTENT)


class StudentUpdatePartsReceivedView(APIView):
    permission_classes = [IsAuthenticated]
    http_method_names = ["put"]

    def put(self, *args, **kwargs):
        pk: int = kwargs.get("pk")
        student: Student = get_object_or_404(Student, pk=pk)

        serializer = StudentUpdatePartsReceivedSerializer(data=self.request.data)

        if serializer.is_valid():
            student.parts_received = serializer.validated_data["parts_received"]
            student.save()

            return Response(status=HTTP_204_NO_CONTENT)

        return Response({"detail": serializer.errors}, HTTP_400_BAD_REQUEST)

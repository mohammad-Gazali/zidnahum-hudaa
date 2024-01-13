from django.utils import timezone
from django.db import transaction
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, DestroyAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from students.serializers import StudentListSerializer, StudentDetailsSerializer, MemorizeNotesCreateSerializer, StudentUpdateQMemoSerializer, StudentUpdateQTestSerializer, MemorizeMessageSerializer, StudentUpdatePartsReceivedSerializer
from students.models import Student, MemorizeNotes, MemorizeMessage, MessageTypeChoice
from students.constants import NON, NEW
from students.permissions import IsMasterForMessage
from comings.models import Coming
from adminstration.models import ControlSettings
from typing import List


class StudentListView(ListAPIView):
    serializer_class = StudentListSerializer

    def get_queryset(self):
        query = self.request.GET.get("query")

        if query is None:
            return

        if self.request.user.is_authenticated:
            return Student.search_student(query).order_by("id")
        else:
            return Student.search_student(query).exclude(pk__in=ControlSettings.get_hidden_ids()).order_by("id")


# TODO: test
class StudentNonRegisterdTodayListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StudentListSerializer

    def get_queryset(self):
        query = self.request.GET.get("query")
        category_id = self.request.GET.get("coming_category_id")

        if query is not None and category_id is not None:
            
            # getting students ids of regestired students in the same day
            # and this is for excluding them from the result
            registered_today = Coming.objects.filter(registered_at__date=timezone.now().date(), category_id=category_id)
            registered_today_ids = set(map(lambda x: x.student_id, registered_today))

            return Student.search_student(query).exclude(pk__in=registered_today_ids).order_by("id")


# TODO: test
class StudentDetailsView(RetrieveAPIView):
    serializer_class = StudentDetailsSerializer

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Student.objects.all()

        return Student.objects.exclude(pk__in=ControlSettings.get_hidden_ids())


# TODO: test
class MemorizeNotesCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MemorizeNotesCreateSerializer
    queryset = MemorizeNotes.objects.all()

    def perform_create(self, serializer: MemorizeNotesCreateSerializer):
        MemorizeNotes.objects.create(
            master_id=self.request.user.pk,
            **serializer.validated_data,
        )


# TODO: test
class MemorizeNotesDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = MemorizeNotes.objects.all()


# TODO: test
class StudentUpdateQMemoView(APIView):
    permission_classes = [IsAuthenticated]
    http_method_names = ["put"]

    @transaction.atomic
    def put(self, *args, **kwargs):
        pk: int = kwargs.get("pk")
        student: Student = get_object_or_404(Student, pk=pk)
        
        serializer = StudentUpdateQMemoSerializer(data=self.request.data)

        if serializer.is_valid():
            new_qmemo: List[int] = serializer.validated_data["q_memo"]
            repeated_memo = []
            added_memo = []

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


# TODO: test
class StudentUpdateQTestView(APIView):
    permission_classes = [IsAuthenticated]
    http_method_names = ["put"]

    @transaction.atomic
    def put(self, *args, **kwargs):
        pk: int = kwargs.get("pk")
        student: Student = get_object_or_404(Student, pk=pk)
        
        serializer = StudentUpdateQTestSerializer(data=self.request.data)

        if serializer.is_valid():
            new_test: List[int] = serializer.validated_data["q_test"]
            repeated_test = []
            added_test = []

            for item in new_test:
                if student.q_test[item] != NON:
                    repeated_test.append(item)
                else:
                    added_test.append(item)
                    student.q_memorizing[item] = NEW

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


# TODO: test
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

            return Response(status=HTTP_200_OK)

        return Response({"detail": serializer.errors}, HTTP_400_BAD_REQUEST)


# TODO: test
class MemorizeMessageListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MemorizeMessageSerializer

    def get_queryset(self):
        return MemorizeMessage.objects.filter(master=self.request.user)


# TODO: test
class MemorizeMessageDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated, IsMasterForMessage]
    queryset = MemorizeMessage.objects.all()
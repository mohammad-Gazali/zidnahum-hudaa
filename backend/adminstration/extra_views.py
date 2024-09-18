from django.shortcuts import get_object_or_404
from django.db import transaction
from django.db.models import Sum
from django.core.exceptions import ValidationError as DjangoValidationError
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, ListAPIView, UpdateAPIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST
from rest_framework.filters import OrderingFilter
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.exceptions import ValidationError
from drf_yasg.utils import swagger_auto_schema
from drf_yasg.openapi import Parameter, IN_QUERY, TYPE_STRING
from adminstration.extra_serializers import StudentUpdateSuperAdminSerializer, StudentUpdateSerializer, AddAwqafTestNoQRequestSerailizer, AddAwqafTestQRequestSerializer, AddMoneyDeletingNormalRequestSerailizer, AddMoneyDeletingCategoryRequestSerailizer, ControlSettingsSerializer, StatisticsRequestSerializer, StatisticsResponseSerializer, TotalMoneyListSerializer
from adminstration.extra_utils import get_students_memo, get_students_test, get_students_awqaf_test, get_students_awqaf_test_looking, get_students_awqaf_test_explaining, get_active_students
from adminstration.models import ControlSettings
from adminstration.permissions import IsSuperUser
from awqaf.models import AwqafNoQStudentRelation
from students.models import Student
from students.constants import NEW, OLD
from money.models import MoneyDeleting

# this is a query param for any model has student field and need to filter by it
param_student_name = Parameter("student__name", IN_QUERY, type=TYPE_STRING, description="param for filtering result via student name or student id")

class StudentUpdateView(UpdateAPIView):
    permission_classes = [IsAdminUser]
    queryset = Student.objects.all()

    def handle_exception(self, exc):
        
        if isinstance(exc, ValidationError):
            return Response({ "detail": exc.detail }, status=HTTP_400_BAD_REQUEST)
        
        if isinstance(exc, DjangoValidationError):
            if len(exc.messages):
                return Response({ "detail": exc.messages[0] }, status=HTTP_400_BAD_REQUEST)

        return super().handle_exception(exc)

    def get_serializer_class(self):
        return StudentUpdateSuperAdminSerializer if self.request.user.is_superuser else StudentUpdateSerializer


class AddAwqafNoQTestCreateView(CreateAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = AddAwqafTestNoQRequestSerailizer

    def perform_create(self, serializer):
        for suid in serializer.validated_data['students']:
            AwqafNoQStudentRelation.objects.get_or_create(
                student_id=suid,
                test_id=serializer.validated_data['test'],
            )


class AddAwqafQTestCreateView(CreateAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = AddAwqafTestQRequestSerializer

    def perform_create(self, serializer):
        test_type = serializer.validated_data['type']
        parts = serializer.validated_data['parts']

        for suid in serializer.validated_data['students']:
            student = get_object_or_404(Student, pk=suid)

            if test_type == 'normal':
                for part in parts:
                    if student.q_awqaf_test[part] != OLD:
                        student.q_awqaf_test[part] = NEW

            elif test_type == 'looking':
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
        for suid in serializer.validated_data['students']:
            MoneyDeleting.objects.create(
                student_id=suid,
                cause_id=serializer.validated_data['cause'],
                value=serializer.validated_data['value'],
            )


class AddMoneyDeletingCategoryCreateView(CreateAPIView):
    permission_classes = [IsSuperUser]
    serializer_class = AddMoneyDeletingCategoryRequestSerailizer

    def perform_create(self, serializer):
        category_id = serializer.validated_data['category']
        masjed = serializer.validated_data['masjed']
        students = Student.objects.filter(category_id=category_id, masjed=masjed)

        for s in students:
            MoneyDeleting.objects.create(
                student=s,
                cause_id=serializer.validated_data['cause'],
                value=serializer.validated_data['value'],
            )


class ControlSettingsReadUpdateView(APIView):
    permission_classes = [IsSuperUser]
    http_method_names = ["get", "put"]

    @swagger_auto_schema(responses={
        HTTP_200_OK: ControlSettingsSerializer
    })
    def get(self, *args, **kwargs):
        serializer = ControlSettingsSerializer(ControlSettings.objects.first())
        return Response(data=serializer.data, status=HTTP_200_OK)

    @swagger_auto_schema(request_body=ControlSettingsSerializer)
    @transaction.atomic
    def put(self, *args, **kwargs):
        serializer = ControlSettingsSerializer(data=self.request.data)

        if serializer.is_valid():
            settings = ControlSettings.objects.first()

            settings.double_points = serializer.validated_data['double_points']
            settings.point_value = serializer.validated_data['point_value']
            settings.event_title = serializer.validated_data['event_title']
            settings.hidden_ids = serializer.validated_data['hidden_ids']

            settings.save()

            return Response(status=HTTP_204_NO_CONTENT)

        return Response({ "detail": serializer.errors }, HTTP_400_BAD_REQUEST)


class TotalMoneyListView(ListAPIView):
    permission_classes = [IsSuperUser]
    pagination_class = LimitOffsetPagination
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    serializer_class = TotalMoneyListSerializer
    ordering_fields = "__all__"

    def handle_exception(self, exc):
        if isinstance(exc, ValidationError):
            return Response({ "detail": exc.detail }, status=HTTP_400_BAD_REQUEST)

        return super().handle_exception(exc)

    def get_queryset(self):
        name = self.request.GET.get("student__name")
        masjed = self.request.GET.get("student__masjed")

        query_kwargs = {"student__name__iregex": Student.search_student_regex(name)} if name else {}
        masjed_kwargs = {"student__masjed": int(masjed)} if masjed else {}


        return (
            MoneyDeleting.objects
                .filter(active_to_points=True)
                .filter(**query_kwargs)
                .filter(**masjed_kwargs)
                .select_related("student")
                .values("student")
                .annotate(sum=Sum("value"))
                .values("student__id", "student__name", "sum")
                .order_by("student__id")
        )
    
    @swagger_auto_schema(manual_parameters=[param_student_name])
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class StatisticsView(APIView):
    permission_classes = [IsSuperUser]
    http_method_names = ["post"]

    @swagger_auto_schema(request_body=StatisticsRequestSerializer, responses={
        HTTP_200_OK: StatisticsResponseSerializer,
    })
    def post(self, *args, **kwargs):
        serializer = StatisticsRequestSerializer(data=self.request.data)

        if serializer.is_valid():
            start_date = serializer.validated_data.get('start_date', None)
            end_date = serializer.validated_data.get('end_date', None)
            memo = serializer.validated_data['memo']
            test = serializer.validated_data['test']
            awqaf_test = serializer.validated_data['awqaf_test']
            awqaf_test_looking = serializer.validated_data['awqaf_test_looking']
            awqaf_test_explaining = serializer.validated_data['awqaf_test_explaining']
            active_students = serializer.validated_data['active_students']
            
            result_dict = {
                'memo': None,
                'test': None,
                'awqaf_test': None,
                'awqaf_test_looking': None,
                'awqaf_test_explaining': None,
                'active_students': None,
            }

            if memo:
                result_dict['memo'] = get_students_memo(start_date, end_date)
            
            if test:
                result_dict['test'] = list(map(lambda x: x / 20, get_students_test(start_date, end_date)))

            if awqaf_test:
                result_dict['awqaf_test'] = get_students_awqaf_test()

            if awqaf_test_looking:
                result_dict['awqaf_test_looking'] = get_students_awqaf_test_looking()

            if awqaf_test_explaining:
                result_dict['awqaf_test_explaining'] = get_students_awqaf_test_explaining()

            if active_students:
                result_dict['active_students'] = get_active_students(start_date, end_date)

            return Response(result_dict, HTTP_200_OK)

        return Response({ "detail": serializer.errors }, HTTP_400_BAD_REQUEST)

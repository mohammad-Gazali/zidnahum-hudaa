from django.shortcuts import get_object_or_404
from django.db import models
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from drf_yasg.utils import swagger_auto_schema
from reports.serializers import ReportsRequestSerializer, ReportsStudentResponseSerializer, ReportsStudentCategoryOrGroupResponseSerializer
from reports.utils import get_student_report, get_category_or_group_report
from students.models import Student, StudentCategory, StudentGroup
from drf_yasg.openapi import Parameter, IN_QUERY, TYPE_BOOLEAN

excel_param = Parameter("excel", IN_QUERY, type=TYPE_BOOLEAN, description="param for determining if the response is excel file or not")

class ReportsStudentView(APIView):
    permission_classes = [IsAdminUser]
    http_method_names = ["post"]

    @swagger_auto_schema(
        manual_parameters=[excel_param],
        request_body=ReportsRequestSerializer,
        responses={
            HTTP_200_OK: ReportsStudentResponseSerializer
        },
    )
    def post(self, *args, **kwargs):
        serializer = ReportsRequestSerializer(data=self.request.data)
        excel = self.request.GET.get('excel', '').lower() == 'true'
        student = get_object_or_404(Student, pk=kwargs.get("id"))

        if serializer.is_valid():
            start_date = serializer.validated_data['start_date']
            end_date = serializer.validated_data['end_date']

            return Response(get_student_report(student, start_date, end_date), HTTP_200_OK)

        return Response({ "detail": serializer.errors }, HTTP_400_BAD_REQUEST)


class ReportsCategoryView(APIView):
    permission_classes = [IsAdminUser]
    http_method_names = ["post"]

    @swagger_auto_schema(
        manual_parameters=[excel_param],
        request_body=ReportsRequestSerializer,
        responses={
            HTTP_200_OK: ReportsStudentCategoryOrGroupResponseSerializer
        },
    )
    def post(self, *args, **kwargs):
        serializer = ReportsRequestSerializer(data=self.request.data)
        excel = self.request.GET.get('excel', '').lower() == 'true'
        category = get_object_or_404(StudentCategory, pk=kwargs.get("id"))

        if serializer.is_valid():
            start_date = serializer.validated_data['start_date']
            end_date = serializer.validated_data['end_date']

            return Response(get_category_or_group_report(category, start_date, end_date), HTTP_200_OK)

        return Response({ "detail": serializer.errors }, HTTP_400_BAD_REQUEST)


class ReportsGroupView(APIView):
    permission_classes = [IsAdminUser]
    http_method_names = ["post"]

    @swagger_auto_schema(
        manual_parameters=[excel_param],
        request_body=ReportsRequestSerializer,
        responses={
            HTTP_200_OK: ReportsStudentCategoryOrGroupResponseSerializer
        },
    )
    def post(self, *args, **kwargs):
        serializer = ReportsRequestSerializer(data=self.request.data)
        excel = self.request.GET.get('excel', '').lower() == 'true'
        group = get_object_or_404(StudentGroup, pk=kwargs.get("id"))

        if serializer.is_valid():
            start_date = serializer.validated_data['start_date']
            end_date = serializer.validated_data['end_date']

            return Response(get_category_or_group_report(group, start_date, end_date), HTTP_200_OK)

        return Response({ "detail": serializer.errors }, HTTP_400_BAD_REQUEST)

from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from drf_yasg.utils import swagger_auto_schema
from reports.serializers import ReportsRequestSerializer, ReportsRequestWithMasjedSerializer, ReportsStudentResponseSerializer, ReportsStudentCategoryOrGroupResponseSerializer, ReportsCategoryOrGroupSpecificResponseSerializer
from reports.utils import get_student_report, get_category_or_group_report, excel_student_report, excel_category_or_group_report, excel_all_categories_or_groups_report
from students.models import Student, StudentCategory, StudentGroup
from drf_yasg.openapi import Parameter, IN_QUERY, TYPE_BOOLEAN

# TODO: continue by testing all of them

excel_param = Parameter("excel", IN_QUERY, type=TYPE_BOOLEAN, description="param for determining if the response is excel file or not")

class ReportsStudentView(APIView):
    permission_classes = [IsAdminUser]
    http_method_names = ["post"]

    @swagger_auto_schema(
        manual_parameters=[excel_param],
        request_body=ReportsRequestSerializer,
        responses={
            HTTP_200_OK: ReportsStudentResponseSerializer,
        },
    )
    def post(self, *args, **kwargs):
        serializer = ReportsRequestSerializer(data=self.request.data)
        excel = self.request.GET.get('excel', '').lower() == 'true'
        student = get_object_or_404(Student, pk=kwargs.get("id"))

        if serializer.is_valid():
            start_date = serializer.validated_data['start_date']
            end_date = serializer.validated_data['end_date']

            report_data = get_student_report(student, start_date, end_date)

            if excel:
                file_bytes = excel_student_report(
                    data=report_data, 
                    student_name=student.name, 
                    start_date=start_date.strftime('%Y-%m-%d'), 
                    end_date=end_date.strftime('%Y-%m-%d'),
                )
                response = HttpResponse(
                    file_bytes,
                    content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8',
                    status=HTTP_200_OK,
                )

                response['Content-Disposition'] = 'attachment; filename="report.xlsx"'

                print('At excel')
                print(response.content)

                return response
                

            return Response(report_data, HTTP_200_OK)

        return Response({ "detail": serializer.errors }, HTTP_400_BAD_REQUEST)


class ReportsCategoryView(APIView):
    permission_classes = [IsAdminUser]
    http_method_names = ["post"]

    @swagger_auto_schema(
        manual_parameters=[excel_param],
        request_body=ReportsRequestWithMasjedSerializer,
        responses={
            HTTP_200_OK: ReportsStudentCategoryOrGroupResponseSerializer,
        },
    )
    def post(self, *args, **kwargs):
        serializer = ReportsRequestWithMasjedSerializer(data=self.request.data)
        excel = self.request.GET.get('excel', '').lower() == 'true'
        category = get_object_or_404(StudentCategory.objects.prefetch_related('student_set__memorizemessage_set'), pk=kwargs.get("id"))

        if serializer.is_valid():
            start_date = serializer.validated_data['start_date']
            end_date = serializer.validated_data['end_date']
            masjed = serializer.validated_data['masjed']

            report_data = get_category_or_group_report(category, masjed, start_date, end_date)

            if excel:
                file_bytes = excel_category_or_group_report(
                    data=report_data, 
                    category_or_group_name=category.name,
                    masjed=masjed,
                    start_date=start_date.strftime('%Y-%m-%d'), 
                    end_date=end_date.strftime('%Y-%m-%d'),
                    is_category=True,
                )

                response = HttpResponse(
                    file_bytes,
                    content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8',
                    status=HTTP_200_OK,
                )

                response['Content-Disposition'] = f'attachment; filename="report.xlsx"'

                return response

            return Response(report_data, HTTP_200_OK)

        return Response({ "detail": serializer.errors }, HTTP_400_BAD_REQUEST)


class ReportsGroupView(APIView):
    permission_classes = [IsAdminUser]
    http_method_names = ["post"]

    @swagger_auto_schema(
        manual_parameters=[excel_param],
        request_body=ReportsRequestWithMasjedSerializer,
        responses={
            HTTP_200_OK: ReportsStudentCategoryOrGroupResponseSerializer,
        },
    )
    def post(self, *args, **kwargs):
        serializer = ReportsRequestWithMasjedSerializer(data=self.request.data)
        excel = self.request.GET.get('excel', '').lower() == 'true'
        group = get_object_or_404(StudentGroup.objects.prefetch_related('student_set__memorizemessage_set'), pk=kwargs.get("id"))

        if serializer.is_valid():
            start_date = serializer.validated_data['start_date']
            end_date = serializer.validated_data['end_date']
            masjed = serializer.validated_data['masjed']

            report_data = get_category_or_group_report(group, masjed, start_date, end_date)

            if excel:
                file_bytes = excel_category_or_group_report(
                    data=report_data, 
                    category_or_group_name=group.name,
                    masjed=masjed,
                    start_date=start_date.strftime('%Y-%m-%d'), 
                    end_date=end_date.strftime('%Y-%m-%d'),
                    is_category=False,
                )

                response = HttpResponse(
                    file_bytes,
                    content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8',
                    status=HTTP_200_OK,
                )

                response['Content-Disposition'] = f'attachment; filename="report.xlsx"'

                return response

            return Response(report_data, HTTP_200_OK)

        return Response({ "detail": serializer.errors }, HTTP_400_BAD_REQUEST)


class ReportsAllCategoriesView(APIView):
    permission_classes = [IsAdminUser]
    http_method_names = ["post"]

    @swagger_auto_schema(
        manual_parameters=[excel_param],
        request_body=ReportsRequestWithMasjedSerializer,
        responses={
            HTTP_200_OK: ReportsCategoryOrGroupSpecificResponseSerializer(many=True),
        },
    )
    def post(self, *args, **kwargs):
        serializer = ReportsRequestWithMasjedSerializer(data=self.request.data)
        excel = self.request.GET.get('excel', '').lower() == 'true'
        categories = StudentCategory.objects.prefetch_related('student_set__memorizemessage_set').all()

        if serializer.is_valid():
            start_date = serializer.validated_data['start_date']
            end_date = serializer.validated_data['end_date']
            masjed = serializer.validated_data['masjed']
            report_data = []
            
            for category in categories:
                report_data.append({
                    **get_category_or_group_report(category, masjed, start_date, end_date),
                    "category_id": category.pk,
                    "category_name": category.name,
                })

            report_data.sort(key=lambda x: x['total'], reverse=True)

            if excel:
                file_bytes = excel_all_categories_or_groups_report(
                    data=report_data, 
                    masjed=masjed,
                    start_date=start_date.strftime('%Y-%m-%d'), 
                    end_date=end_date.strftime('%Y-%m-%d'),
                    is_category=True,
                )

                response = HttpResponse(
                    file_bytes,
                    content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8',
                    status=HTTP_200_OK,
                )

                response['Content-Disposition'] = f'attachment; filename="report.xlsx"'

                return response

            return Response(report_data, HTTP_200_OK)

        return Response({ "detail": serializer.errors }, HTTP_400_BAD_REQUEST)


class ReportsAllGroupsView(APIView):
    permission_classes = [IsAdminUser]
    http_method_names = ["post"]

    @swagger_auto_schema(
        manual_parameters=[excel_param],
        request_body=ReportsRequestWithMasjedSerializer,
        responses={
            HTTP_200_OK: ReportsCategoryOrGroupSpecificResponseSerializer(many=True),
        },
    )
    def post(self, *args, **kwargs):
        serializer = ReportsRequestWithMasjedSerializer(data=self.request.data)
        excel = self.request.GET.get('excel', '').lower() == 'true'
        groups = StudentGroup.objects.prefetch_related('student_set__memorizemessage_set').all()

        if serializer.is_valid():
            start_date = serializer.validated_data['start_date']
            end_date = serializer.validated_data['end_date']
            masjed = serializer.validated_data['masjed']
            report_data = []
            
            for group in groups:
                report_data.append({
                    **get_category_or_group_report(group, masjed, start_date, end_date),
                    "group_id": group.pk,
                    "group_name": group.name,
                })

            report_data.sort(key=lambda x: x['total'], reverse=True)

            if excel:
                file_bytes = excel_all_categories_or_groups_report(
                    data=report_data, 
                    masjed=masjed,
                    start_date=start_date.strftime('%Y-%m-%d'), 
                    end_date=end_date.strftime('%Y-%m-%d'),
                    is_category=False,
                )

                response = HttpResponse(
                    file_bytes,
                    content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8',
                    status=HTTP_200_OK,
                )

                response['Content-Disposition'] = f'attachment; filename="report.xlsx"'

                return response

            return Response(report_data, HTTP_200_OK)

        return Response({ "detail": serializer.errors }, HTTP_400_BAD_REQUEST)
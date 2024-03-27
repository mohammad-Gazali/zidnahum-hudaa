from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST
from drf_yasg.utils import swagger_auto_schema
from adminstration.extra_serializers import AddAwqafTestNoQRequestSerailizer, AddAwqafTestQRequestSerializer
from awqaf.models import AwqafNoQStudentRelation
from students.models import Student
from students.constants import NEW, OLD

class AddAwqafNoQTestCreateView(APIView):
    http_method_names = ["post"]
    permission_classes = [IsAdminUser]

    @swagger_auto_schema(request_body=AddAwqafTestNoQRequestSerailizer)
    def post(self, *args, **kwargs):
        serializer = AddAwqafTestNoQRequestSerailizer(data=self.request.data)

        if serializer.is_valid():
            for suid in serializer.validated_data['students']:
                AwqafNoQStudentRelation.objects.get_or_create(
                    student_id=suid,
                    test_id=serializer.validated_data['test'],
                )

            return Response(status=HTTP_204_NO_CONTENT)

        return Response({ "detail": serializer.errors }, HTTP_400_BAD_REQUEST)


class AddAwqafQTestCreateView(APIView):
    http_method_names = ["post"]
    permission_classes = [IsAdminUser]

    @swagger_auto_schema(request_body=AddAwqafTestQRequestSerializer)
    def post(self, *args, **kwargs):
        serializer = AddAwqafTestQRequestSerializer(data=self.request.data)

        if serializer.is_valid():
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
                
            return Response(status=HTTP_204_NO_CONTENT)                

        return Response({ "detail": serializer.errors }, HTTP_400_BAD_REQUEST)
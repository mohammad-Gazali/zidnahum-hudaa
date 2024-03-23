from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST
from drf_yasg.utils import swagger_auto_schema
from adminstration.extra_serializers import AddAwqafTestNoQRequestSerailizer
from awqaf.models import AwqafNoQStudentRelation

class AddAwqafNoQTestCreateView(APIView):
    http_method_names = ["post"]
    permission_classes = [IsAdminUser]

    @swagger_auto_schema(request_body=AddAwqafTestNoQRequestSerailizer)
    def post(self, *args, **kwargs):
        serializer = AddAwqafTestNoQRequestSerailizer(data=self.request.data)

        if serializer.is_valid():
            for suid in serializer.validated_data['students']:
                AwqafNoQStudentRelation.objects.create(
                    student_id=suid,
                    test_id=serializer.validated_data['test'],
                )

            return Response(status=HTTP_204_NO_CONTENT)

        return Response({ "detail": serializer.errors }, HTTP_400_BAD_REQUEST)
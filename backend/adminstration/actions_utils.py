from django.db import transaction
from django.db.models import Model
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST
from drf_yasg.utils import swagger_auto_schema
from adminstration.actions_serializers import DeleteModelActionSerializer
from typing import Type


def create_delete_model_action_view(model: Type[Model]) -> Type[APIView]:
    class Result(APIView):
        permission_classes = [IsAdminUser]
        http_method_names = ["delete"]

        @swagger_auto_schema(request_body=DeleteModelActionSerializer)
        @transaction.atomic
        def delete(self, *args, **kwargs):
            serializer = DeleteModelActionSerializer(data=self.request.data)
            
            if serializer.is_valid():
                ids = serializer.validated_data['ids']

                model.objects.filter(pk__in=ids).delete()

                return Response(status=HTTP_204_NO_CONTENT)

            return Response({ "detail": serializer.errors }, HTTP_400_BAD_REQUEST)

    return Result
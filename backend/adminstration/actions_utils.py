from django.db import transaction
from django.db.models import Model
from django.db.models.deletion import ProtectedError
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_403_FORBIDDEN
from drf_yasg.utils import swagger_auto_schema
from adminstration.actions_serializers import IdsActionSerializer
from adminstration.permissions import IsSuperUser
from typing import Type


def create_delete_model_action_view(model: Type[Model], superuser: bool = True) -> Type[APIView]:
    class Result(APIView):
        permission_classes = [IsSuperUser if superuser else IsAdminUser]
        http_method_names = ["delete"]

        def handle_exception(self, exc):
            if isinstance(exc, ProtectedError):
                model = exc.protected_objects.pop()
                return Response({ "detail": f"لا يمكن حذف العناصر لأنها مرتبطة بـ '{model.__class__._meta.verbose_name_plural}'" }, HTTP_403_FORBIDDEN)
                
            return super().handle_exception(exc)

        @swagger_auto_schema(request_body=IdsActionSerializer)
        @transaction.atomic
        def delete(self, *args, **kwargs):
            serializer = IdsActionSerializer(data=self.request.data)
            
            if serializer.is_valid():
                ids = serializer.validated_data['ids']

                model.objects.filter(pk__in=ids).delete()

                return Response(status=HTTP_204_NO_CONTENT)

            return Response({ "detail": serializer.errors }, HTTP_400_BAD_REQUEST)

    return Result
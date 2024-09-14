from django.db.models import Model
from django.http import QueryDict
from django.contrib.auth import get_user_model
from django.db.models.deletion import ProtectedError
from django.core.exceptions import ValidationError as DjangoValidationError
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.serializers import ModelSerializer, IntegerField, CharField
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser
from rest_framework.filters import OrderingFilter
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_403_FORBIDDEN
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from drf_yasg.utils import swagger_auto_schema
from drf_yasg.openapi import Parameter, IN_QUERY, TYPE_STRING
from adminstration.permissions import IsSuperUser
from students.models import Student
from typing import Type, List, Dict, Literal, Any


class BaseViewSet(ModelViewSet):
    """
    A base class that inherit from `ModelViewSet` applying 
    django filter package filters and ordering filter
    """
    pagination_class = LimitOffsetPagination
    max_limit = 20
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = "__all__"

    def handle_exception(self, exc):
        if isinstance(exc, ValidationError):
            return Response({ "detail": exc.detail }, status=HTTP_400_BAD_REQUEST)
        elif isinstance(exc, DjangoValidationError):
            if len(exc.messages):
                return Response({ "detail": exc.messages[0] }, status=HTTP_400_BAD_REQUEST)
        return super().handle_exception(exc)

# this is a query param for name for Student model
param_name = Parameter("name", IN_QUERY, type=TYPE_STRING, description="param for filtering student via his name or his id")

# this is a query param for any model has student field and need to filter by it
param_student_name = Parameter("student__name", IN_QUERY, type=TYPE_STRING, description="param for filtering result via student name or student id")


def create_serializer(
    model_class: Type[Model],
    serializer_fields: List[str] | Literal["__all__"],
    exclude_fields: bool = False,
    extra_ref: Any = None,
) -> Type[ModelSerializer]:
    """
    a helper function for creating serializers without declaring
    an individual class.

    - `model class` is the model class itself not an instance of it.

    - `serializer_fields` are the fields of the resulting serializer.

    - `exclude_fields` is a boolean refer to whether the `serializer_fields` is for
    declaring or excluding.

    - `extra_ref` is param used for `ref_name` attribute in the resulting class
    because if we don't define `ref_name` then an error will appear because
    `drf_yasg` use the class name is the first method to distinguish between
    serializers, and we called the the resulting class `Result` so we must declare
    `ref_name`.
    """

    if exclude_fields:
        class Result(ModelSerializer):
            if (serializer_fields == "__all__") or ("id" in serializer_fields and not exclude_fields) or ("id" not in serializer_fields and exclude_fields):
                id = IntegerField()

            class Meta:
                ref_name = f"{model_class.__name__}-{extra_ref}" if extra_ref is not None else model_class.__name__
                model = model_class
                exclude = serializer_fields
    else:
        class Result(ModelSerializer):
            if (serializer_fields == "__all__") or ("id" in serializer_fields and not exclude_fields) or ("id" not in serializer_fields and exclude_fields):
                id = IntegerField()

            if "student_name" in serializer_fields:
                student_name = CharField(source="student.name")

            class Meta:
                ref_name = f"{model_class.__name__}-{extra_ref}" if extra_ref is not None else model_class.__name__
                model = model_class
                fields = serializer_fields

    return Result


def create_model_view_set(
    model: Type[Model],
    fields: List[str] | Literal["__all__"] = "__all__",
    exclude_fields: bool = False,
    methods: List[Literal["get", "post", "put", "delete"]] = None,
    filter_fields: List[str] | Literal["__all__"] | Dict[str, List[str]] = None,
    include_student_name_filter: bool = False,
    creating_serializer: Type[ModelSerializer] = None,
    updating_serializer: Type[ModelSerializer] = None,
    listing_serializer: Type[ModelSerializer] = None,
    details_serializer: Type[ModelSerializer] = None,
    no_pagination: bool = False,
    multipart: bool = False,
    superuser: bool | Literal["non_list_only"] = False,
) -> Type[BaseViewSet]:
    """
    a helper function for creating view sets without declaring an
    individual class.

    - `model` is the model class itself not an instance of it.

    - `fields` are the fields we will pass to the inner serializer of the view set.

    - `exclude_fields` is a boolean refer to whether the `fields` is for
    declaring or excluding.

    - `methods` are the http methods that will be used in the resulting view set.

    - `filter_fields` are the fields that we will use `django_filter` package for filtering.

    - `include_student_name_filter` is a boolean refer to whether we will use owr custom
    student name filter (that is defined as classmethod in `Student` model where they are
    `search_student` and `search_student_regex`), this indicate that the `model` param must
    have a field called `student` refer to `Student` model.

    - `creating_serializer`, `updating_serializer`, `listing_serializer` and
    `details_serializer` are direct params for declaring serializers for certain methods.

    - `no_pagination` removes the pagination if it is True
    """

    class Result(BaseViewSet):
        permission_classes = [IsSuperUser if superuser else IsAdminUser]
        http_method_names = methods or ["get", "post", "put", "delete"]
        filterset_fields = filter_fields

        def get_permissions(self):
            if superuser == "non_list_only":
                if self.request.method == "GET":
                    return [IsAdminUser()]
                else:
                    return [IsSuperUser()]

            if superuser: 
                return [IsSuperUser()]
            else:
                return [IsAdminUser()]

        def handle_exception(self, exc):
            if isinstance(exc, ProtectedError):
                model = exc.protected_objects.pop()
                return Response({ "detail": f"لا يمكن حذف العناصر لأنها مرتبطة بـ '{model.__class__._meta.verbose_name_plural}'" }, HTTP_403_FORBIDDEN)
                
            return super().handle_exception(exc)

        if no_pagination:
            pagination_class = None

        if multipart:
            parser_classes = [MultiPartParser]

        # here we made a condition to determine the desired decorator we want to use with list method
        if model == Student:
            @swagger_auto_schema(manual_parameters=[param_name])
            def list(self, request, *args, **kwargs):
                return super().list(request, *args, **kwargs)

        elif include_student_name_filter:
            @swagger_auto_schema(manual_parameters=[param_student_name])
            def list(self, request, *args, **kwargs):
                return super().list(request, *args, **kwargs)

        if listing_serializer is not None:
            @swagger_auto_schema(responses={
                HTTP_200_OK: details_serializer or create_serializer(model, fields, exclude_fields, "details")
            })
            def retrieve(self, request, *args, **kwargs):
                return super().retrieve(request, *args, **kwargs)

        def get_serializer_class(self):
            if self.request.method == "GET":
                if self.kwargs.get("pk") is not None:
                    return details_serializer or create_serializer(model, fields, exclude_fields, "details")
                else:
                    return listing_serializer or create_serializer(model, fields, exclude_fields, "list")
            elif self.request.method == "POST":
                create_fields = fields.copy() if type(fields) != str else fields
                create_exclude = exclude_fields

                if fields == "__all__":
                    create_exclude = True
                    create_fields = ["id"]
                elif exclude_fields and ("id" not in fields):
                    create_fields.append("id")
                elif not exclude_fields and ("id" in fields):
                    create_fields.remove("id")

                return creating_serializer or create_serializer(model, create_fields, create_exclude, "create")
            else:
                update_fields = fields.copy() if type(fields) != str else fields
                update_exclude = exclude_fields

                if fields == "__all__":
                    update_exclude = True
                    update_fields = ["id"]
                elif exclude_fields and ("id" not in fields):
                    update_fields.append("id")
                elif not exclude_fields and ("id" in fields):
                    update_fields.remove("id")

                return updating_serializer or create_serializer(model, update_fields, update_exclude, "update")

        def get_queryset(self):
            query_set = model.objects.all()
            query_params: QueryDict = self.request.query_params

            for param, value in query_params.items():
                if model == Student and param.startswith("name"):
                    query_set = Student.search_student(value)                    

                elif param.startswith("student__name"):
                    regex = Student.search_student_regex(value)
                    query_set = query_set.filter(student__name__iregex="{}".format(regex))

            return query_set.order_by('-id')

        def perform_create(self, serializer):
            # here we overrided the normal way of creating model instances
            # because User model don't set the hashed password by default
            # so we used the `create_user` method
            # also we can't assign groups directly so we set them the way
            # we do with many-to-many relations
            if model == get_user_model():
                groups = serializer.validated_data["groups"]

                del serializer.validated_data["groups"]
                
                user = model.objects.create_user(
                    **serializer.validated_data,
                )

                user.groups.set(groups)

                return

            return super().perform_create(serializer)

    return Result
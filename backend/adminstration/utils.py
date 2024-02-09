from django.db.models import Model
from django.http import QueryDict
from django.contrib.auth import get_user_model
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.serializers import ModelSerializer, IntegerField
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser
from rest_framework.filters import OrderingFilter
from rest_framework.pagination import LimitOffsetPagination
from drf_yasg.utils import swagger_auto_schema
from drf_yasg.openapi import Parameter, IN_QUERY, TYPE_STRING
from students.models import Student
from typing import Type, List, Dict, Literal, Any


class BaseViewSet(ModelViewSet):
    """
    A base class that inherit from `ModelViewSet`, and also has
    permission_classes set to `[IsAdminUser]`, and applying 
    django filter package filters and ordering filter
    """
    permission_classes = [IsAdminUser]
    pagination_class = LimitOffsetPagination
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    ordering_fields = "__all__"

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
            id = IntegerField()

            class Meta:
                ref_name = f"{model_class.__name__}-{extra_ref}" if extra_ref is not None else model_class.__name__
                model = model_class
                exclude = serializer_fields
    else:
        class Result(ModelSerializer):
            id = IntegerField()
            
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
    """

    class Result(BaseViewSet):
        http_method_names = methods or ["get", "post", "put", "delete"]
        filterset_fields = filter_fields

        if no_pagination:
            pagination_class = None

        # here we made a condition to determine the desired decorator we want to use with list method
        if model == Student:
            @swagger_auto_schema(manual_parameters=[param_name])
            def list(self, request, *args, **kwargs):
                return super().list(request, *args, **kwargs)

        elif include_student_name_filter:
            @swagger_auto_schema(manual_parameters=[param_student_name])
            def list(self, request, *args, **kwargs):
                return super().list(request, *args, **kwargs)

        def get_serializer_class(self):
            if self.request.method == "GET":
                if self.kwargs.get("id") is not None:
                    return details_serializer or create_serializer(model, fields, exclude_fields, "details")
                else:
                    return listing_serializer or create_serializer(model, fields, exclude_fields, "list")
            elif self.request.method == "POST":
                return creating_serializer or create_serializer(model, fields, exclude_fields, "create")
            else:
                return updating_serializer or create_serializer(model, fields, exclude_fields, "update")

        def get_queryset(self):
            query_set = model.objects.all()
            query_params: QueryDict = self.request.query_params

            for param, value in query_params.items():
                if model == Student and param.startswith("name"):
                    query_set = Student.search_student(value)                    

                elif param.startswith("student__name"):
                    regex = Student.search_student_regex(value)
                    query_set = query_set.filter(student__name__iregex="{}".format(regex))

            return query_set

        def perform_create(self, serializer):
            # here we overrided the normal way of creating model instances
            # because User model don't set the hashed password by default
            if model == get_user_model():
                password = serializer.validated_data["password"]
                del serializer.validated_data["password"]
                
                model.objects.create(
                    **serializer.validated_data,
                )

                model.set_password(password)

                return

            return super().perform_create(serializer)

    return Result
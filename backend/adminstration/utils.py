from django.db.models import Model
from django.http import QueryDict
from django.contrib.auth import get_user_model
from django.core.exceptions import FieldError
from rest_framework.serializers import ModelSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST
from students.models import Student
from typing import Type, List, Literal, Any


class BaseViewSet(ModelViewSet):...
    # permission_classes = [IsAdminUser]

def create_serializer(model_class: Type[Model], serializer_fields: List[str] | Literal["__all__"], exclude: bool = False, extra_ref: Any = None) -> Type[ModelSerializer]:
    if exclude:
        class Result(ModelSerializer):
            class Meta:
                ref_name = f"{model_class}-{extra_ref}" if extra_ref is not None else str(extra_ref)
                model = model_class
                exclude = serializer_fields
    else:
        class Result(ModelSerializer):
            class Meta:
                ref_name = f"{model_class}-{extra_ref}" if extra_ref is not None else str(model_class)
                model = model_class
                fields = serializer_fields

    return Result


def create_model_view_set(
    model: Type[Model],
    fields: List[str] | Literal["__all__"] = "__all__",
    methods: List[Literal["get", "post", "put", "delete"]] = None,
    creating_serializer: Type[ModelSerializer] = None,
    updating_serializer: Type[ModelSerializer] = None,
    listing_serializer: Type[ModelSerializer] = None,
    details_serializer: Type[ModelSerializer] = None,
    exclude: bool = False,
) -> Type[BaseViewSet]:
    class Result(BaseViewSet):
        http_method_names = methods or ["get", "post", "put", "delete"]
        queryset = model.objects.all()

        def handle_exception(self, exc):
            if isinstance(exc, FieldError):
                return Response({"details": "invalid search params"}, HTTP_400_BAD_REQUEST)
            return super().handle_exception(exc)

        def get_serializer_class(self):
            if self.request.method == "GET":
                if self.kwargs.get("id") is not None:
                    return details_serializer or create_serializer(model, fields, exclude, "details")
                else:
                    return listing_serializer or create_serializer(model, fields, exclude, "list")
            elif self.request.method == "POST":
                return creating_serializer or create_serializer(model, fields, exclude, "create")
            else:
                return updating_serializer or create_serializer(model, fields, exclude, "update")

        def get_queryset(self):
            query_set = model.objects.all()
            query_params: QueryDict = self.request.query_params.copy()
            
            for_pop = []

            for param, value in query_params.items():
                if model == Student and param == "name":
                    query_set = Student.search_student(value)
                    for_pop.append(param)

                elif param.startswith("student__name"):
                    regex = Student.search_student_regex(value)
                    query_set = query_set.filter(student__name__iregex="{}".format(regex))
                    for_pop.append(param)

                elif param.count("__isnull") > 0:
                    filter_value = False if value.lower() == "false" else True
                    query_set = query_set.filter(**{param: filter_value})
                    for_pop.append(param)

                elif param == "format":
                    for_pop.append("format")

            for value in for_pop:
                query_params.pop(value)

            return query_set.filter(**query_params)

        def perform_create(self, serializer):
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
from rest_framework.generics import ListAPIView
from students.models import StudentCategory, StudentGroup
from students.serializers import StudentCategorySerializer, StudentGroupSerializer

# TODO: test
class StudentCategoryListView(ListAPIView):
    serializer_class = StudentCategorySerializer
    queryset = StudentCategory.objects.all()
    pagination_class = None


# TODO: test
class StudentGroupListView(ListAPIView):
    serializer_class = StudentGroupSerializer
    queryset = StudentGroup.objects.all()
    pagination_class = None
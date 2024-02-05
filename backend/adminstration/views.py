from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from adminstration.utils import create_model_view_set, create_serializer
from awqaf.models import AwqafTestNoQ, AwqafNoQStudentRelation
from comings.models import ComingCategory, Coming
from globals.models import AssetsCategory, AssetFile
from money.models import MoneyDeletingCause, MoneyDeleting
from points.models import PointsAddingCause, PointsAdding, PointsDeletingCause, PointsDeleting
from students.models import StudentCategory, StudentGroup, Student, MemorizeMessage, MemorizeNotes


# auth view sets
AdminUserViewSet = create_model_view_set(get_user_model(), filter_fields=["is_superuser", "is_active"])
AdminGroupViewSet = create_model_view_set(Group, fields=["permissions"], exclude_fields=True)

# awqaf view sets
AdminAwqafTestNoQViewSet = create_model_view_set(AwqafTestNoQ)
AdminAwqafNoQStudentRelationViewSet = create_model_view_set(
    AwqafNoQStudentRelation,
    filter_fields=["test", "is_old"],
    include_student_name_filter=True,
)

# comings view sets
AdminComingCategoryViewSet = create_model_view_set(ComingCategory)
AdminComingViewSet = create_model_view_set(
    Coming, 
    methods=["get", "delete"],
    filter_fields={
        "master": ["exact"],
        "category": ["exact"],
        "is_doubled": ["exact"],
        "registered_at": ["gt", "lt"],
    },
    include_student_name_filter=True,
)

# globals view sets
AdminAssetsCategoryViewSet = create_model_view_set(AssetsCategory)
AdminAssetFileViewSet = create_model_view_set(AssetFile, filter_fields=["category"])

# money view sets
AdminMoneyDeletingCauseViewSet = create_model_view_set(MoneyDeletingCause)
AdminMoneyDeletingViewSet = create_model_view_set(
    MoneyDeleting,
    filter_fields=["cause"],
    include_student_name_filter=True,
)

# points view sets
AdminPointsAddingCauseViewSet = create_model_view_set(PointsAddingCause)
AdminPointsAddingViewSet = create_model_view_set(
    PointsAdding,
    methods=["get", "put", "delete"],
    filter_fields={
        "master": ["exact"],
        "cause": ["exact"],
        "created_at": ["gt", "lt"],
    },
    include_student_name_filter=True,
)
AdminPointsDeletingCauseViewSet = create_model_view_set(PointsDeletingCause)
AdminPointsDeletingViewSet = create_model_view_set(
    PointsDeleting,
    methods=["get", "put", "delete"],
    filter_fields={
        "master": ["exact"],
        "cause": ["exact"],
        "created_at": ["gt", "lt"],
    },
    include_student_name_filter=True,
)

# students view sets
AdminStudentCategoryViewSet = create_model_view_set(StudentCategory)
AdminStudentGroupViewSet = create_model_view_set(StudentGroup)

AdminCreateStudentSerializer = create_serializer(Student, serializer_fields=[
        "q_memorizing", "q_test", "q_awqaf_test",
        "q_awqaf_test_looking", "q_awqaf_test_explaining",
        "alarbaein_alnawawia_new", "alarbaein_alnawawia_old",
        "riad_alsaalihin_new", "riad_alsaalihin_old",
        "allah_names_new", "allah_names_old",
    ],
    exclude_fields=True,
    extra_ref="create"
)
AdminListStudentSerializer = create_serializer(Student, serializer_fields=["id", "name", "mother_name", "category", "group", "registered_at"])
AdminStudentViewSet = create_model_view_set(
    Student,
    filter_fields={        
        "category": ["exact", "isnull"],
        "group": ["exact", "isnull"],
        "registered_at": ["gt", "lt"],
    },
    include_student_name_filter=True,
    creating_serializer=AdminCreateStudentSerializer,
    listing_serializer=AdminListStudentSerializer,
)

AdminMemorizeMessageViewSet = create_model_view_set(
    MemorizeMessage,
    methods=["get", "delete"],
    filter_fields={
        "master": ["exact"],
        "message_type": ["exact"],
        "is_doubled": ["exact"],
        "sended_at": ["gt", "lt"],
    },
    include_student_name_filter=True,
)
AdminMemorizeNotesViewSet = create_model_view_set(
    MemorizeNotes,
    methods=["get", "delete"],
    filter_fields={
        "master": ["exact"],
        "sended_at": ["gt", "lt"],
    },
    include_student_name_filter=True
)
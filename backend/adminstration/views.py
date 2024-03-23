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
AdminListUserSerializer = create_serializer(get_user_model(), ["id", "username", "first_name", "last_name", "is_active", "is_staff", "is_superuser"], extra_ref="list")
AdminCreateUserSerializer = create_serializer(get_user_model(), ["username", "password", "first_name", "last_name", "is_active", "is_staff", "is_superuser", "groups"], extra_ref="create")
AdminUserViewSet = create_model_view_set(
    get_user_model(),
    fields=["id", "username", "first_name", "last_name", "is_active", "is_staff", "is_superuser", "groups"],
    listing_serializer=AdminListUserSerializer,
    creating_serializer=AdminCreateUserSerializer,
    no_pagination=True,
)
AdminGroupViewSet = create_model_view_set(Group, fields=["permissions"], exclude_fields=True, no_pagination=True)

# awqaf view sets
AdminAwqafTestNoQViewSet = create_model_view_set(AwqafTestNoQ, no_pagination=True)
AdminAwqafNoQStudentRelationViewSet = create_model_view_set(
    AwqafNoQStudentRelation,
    fields=["id", "student", "student_name", "test", "is_old"],
    filter_fields={
        "test": ["exact"],
        "is_old": ["exact"],
        "student__masjed": ["exact"],
    },
    include_student_name_filter=True,
)

# comings view sets
AdminComingCategoryViewSet = create_model_view_set(ComingCategory, no_pagination=True)
AdminComingViewSet = create_model_view_set(
    Coming, 
    methods=["get", "delete"],
    fields=["id", "registered_at", "is_doubled", "master", "student", "student_name", "category"],
    filter_fields={
        "master": ["exact", "isnull"],
        "category": ["exact"],
        "is_doubled": ["exact"],
        "registered_at": ["date", "gt", "lt"],
        "student__masjed": ["exact"],
    },
    include_student_name_filter=True,
)

# globals view sets
AdminAssetsCategoryViewSet = create_model_view_set(AssetsCategory, no_pagination=True)
AdminAssetFileViewSet = create_model_view_set(AssetFile, methods=["get", "post", "delete"], filter_fields=["category"], multipart=True)

# money view sets
AdminMoneyDeletingCauseViewSet = create_model_view_set(MoneyDeletingCause, no_pagination=True)
AdminMoneyDeletingViewSet = create_model_view_set(
    MoneyDeleting,
    fields=["id", "created_at", "active_to_points", "value", "student", "student_name", "cause"],
    filter_fields={
        "cause": ["exact"],
        "student__masjed": ["exact"],
        "active_to_points": ["exact"],
        "created_at": ["date", "gt", "lt"],
    },
    include_student_name_filter=True,
)

# points view sets
AdminPointsAddingCauseViewSet = create_model_view_set(PointsAddingCause, no_pagination=True)
AdminPointsAddingViewSet = create_model_view_set(
    PointsAdding,
    methods=["get", "delete"],
    fields=["id", "student", "student_name", "master", "created_at", "cause", "value"],
    filter_fields={
        "master": ["exact", "isnull"],
        "cause": ["exact"],
        "created_at": ["date", "gt", "lt"],
        "student__masjed": ["exact"],
    },
    include_student_name_filter=True,
)
AdminPointsDeletingCauseViewSet = create_model_view_set(PointsDeletingCause, no_pagination=True)
AdminPointsDeletingViewSet = create_model_view_set(
    PointsDeleting,
    methods=["get", "delete"],
    fields=["id", "student", "student_name", "master", "created_at", "cause", "value"],
    filter_fields={
        "master": ["exact", "isnull"],
        "cause": ["exact"],
        "created_at": ["date", "gt", "lt"],
        "student__masjed": ["exact"],
    },
    include_student_name_filter=True,
)

# students view sets
AdminStudentCategoryViewSet = create_model_view_set(StudentCategory, no_pagination=True)
AdminStudentGroupViewSet = create_model_view_set(StudentGroup, no_pagination=True)

AdminCreateStudentSerializer = create_serializer(Student, serializer_fields=[
        "id", "registered_at", "q_memorizing", "q_test", "q_elite_test", "q_awqaf_test",
        "q_awqaf_test_looking", "q_awqaf_test_explaining",
        "alarbaein_alnawawia_new", "alarbaein_alnawawia_old",
        "riad_alsaalihin_new", "riad_alsaalihin_old",
        "allah_names_new", "allah_names_old",
    ],
    exclude_fields=True,
    extra_ref="create"
)
AdminListStudentSerializer = create_serializer(Student, serializer_fields=["id", "name", "mother_name", "masjed", "category", "group", "registered_at"], extra_ref="list")
AdminUpdateStudentSerializer = create_serializer(Student, serializer_fields=["id", "registered_at"], exclude_fields=True, extra_ref="update")
AdminStudentViewSet = create_model_view_set(
    Student,
    filter_fields={
        "masjed": ["exact"],
        "category": ["exact", "isnull"],
        "group": ["exact", "isnull"],
        "registered_at": ["exact", "gt", "lt"],
    },
    include_student_name_filter=True,
    updating_serializer=AdminUpdateStudentSerializer,
    creating_serializer=AdminCreateStudentSerializer,
    listing_serializer=AdminListStudentSerializer,
)

AdminMemorizeMessageViewSet = create_model_view_set(
    MemorizeMessage,
    fields=["id", "master", "student", "student_name", "sended_at", "changes", "message_type", "is_doubled"],
    methods=["get", "delete"],
    filter_fields={
        "master": ["exact", "isnull"],
        "message_type": ["exact"],
        "is_doubled": ["exact"],
        "sended_at": ["date", "gt", "lt"],
        "student__masjed": ["exact"],
    },
    include_student_name_filter=True,
)
AdminMemorizeNotesViewSet = create_model_view_set(
    MemorizeNotes,
    fields=["id", "content", "student", "student_name", "master", "sended_at"],
    methods=["get", "delete"],
    filter_fields={
        "master": ["exact", "isnull"],
        "sended_at": ["exact", "gt", "lt"],
        "student__masjed": ["exact"],
    },
    include_student_name_filter=True
)
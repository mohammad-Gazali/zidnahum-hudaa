from rest_framework import serializers
from awqaf.models import AwqafTestNoQ, AwqafNoQStudentRelation


class AwqafTestNoQSerializer(serializers.ModelSerializer):
    class Meta:
        model = AwqafTestNoQ
        fields = "__all__"


class AwqafRelationSerializer(serializers.ModelSerializer):
    class Meta:
        model = AwqafNoQStudentRelation
        exclude = ["student"]
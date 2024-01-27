from rest_framework import serializers
from awqaf.models import AwqafTestNoQ


class AwqafTestNoQSerializer(serializers.ModelSerializer):
    class Meta:
        model = AwqafTestNoQ
        fields = "__all__"
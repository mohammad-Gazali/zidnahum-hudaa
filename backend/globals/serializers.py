from rest_framework import serializers
from globals.models import AssetsCategory, AssetFile


class AssetFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssetFile
        exclude = ["category"]


class AssetCategorySerializer(serializers.ModelSerializer):
    files = AssetFileSerializer(many=True)

    class Meta:
        model = AssetsCategory
        fields = "__all__"
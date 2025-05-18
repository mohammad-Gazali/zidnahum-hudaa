from rest_framework import serializers
from globals.models import AssetsCategory, AssetFile, News


class AssetFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssetFile
        exclude = ["category"]


class AssetCategorySerializer(serializers.ModelSerializer):
    files = AssetFileSerializer(many=True)

    class Meta:
        model = AssetsCategory
        fields = "__all__"


class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = "__all__"
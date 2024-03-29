from rest_framework import serializers

class UserUpdatePasswordSerializer(serializers.Serializer):
    user = serializers.IntegerField()
    new_password = serializers.CharField(max_length=128, min_length=1)


class DeleteModelActionSerializer(serializers.Serializer):
    ids = serializers.ListField(child=serializers.IntegerField(), allow_empty=False)
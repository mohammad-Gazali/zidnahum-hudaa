from rest_framework import serializers

class UserUpdatePasswordSerializer(serializers.Serializer):
    user = serializers.IntegerField()
    new_password = serializers.CharField(max_length=128, min_length=1)


class IdsActionSerializer(serializers.Serializer):
    ids = serializers.ListField(child=serializers.IntegerField(min_value=1), allow_empty=False)


class ActionBooleanUpdateSerializer(IdsActionSerializer):
    value = serializers.BooleanField()
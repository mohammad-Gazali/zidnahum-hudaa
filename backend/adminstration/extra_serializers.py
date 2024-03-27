from rest_framework import serializers

class AddAwqafTestNoQRequestSerailizer(serializers.Serializer):
    students = serializers.ListField(child=serializers.IntegerField(), allow_empty=False)
    test = serializers.IntegerField()


class AddAwqafTestQRequestSerializer(serializers.Serializer):
    students = serializers.ListField(child=serializers.IntegerField(), allow_empty=False)
    type = serializers.ChoiceField(choices=[
        ('normal', 'normal'),
        ('looking', 'looking'),
        ('explaining', 'explaining'),
    ])
    parts = serializers.ListField(child=serializers.IntegerField(min_value=0, max_value=29))
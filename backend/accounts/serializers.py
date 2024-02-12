from rest_framework import serializers

from accounts.models import User


class UserSerializer(serializers.ModelSerializer):
    """
    A Serilaizer for User Model
    """
    class Meta:
        model = User
        fields = (
            'email',
            'role',
            'first_name',
            'last_name',
            'date_of_birth',
            'gender',
            'address',
            'mobile_number',
            'profile_picture',
            'is_active',
        )

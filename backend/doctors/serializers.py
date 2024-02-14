from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.core.validators import MinLengthValidator, RegexValidator
from rest_framework.validators import UniqueValidator
from django.contrib.auth import authenticate

from doctors.models import Doctor
from accounts.serializers import UserSerializer


class DoctorSerializer(serializers.ModelSerializer):
    """
    A Serializer for the Patient Model, That use nested UserSerializer.
    """
    user = UserSerializer()

    class Meta:
        model = Doctor
        fields = (
            'user',
            'specialization',
            'years_of_experience',
            'education',
            'clinic_address',
            'clinic_phone_number',
            'clinic_website',
            'is_approved',
        )

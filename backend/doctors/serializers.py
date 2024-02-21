from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.core.validators import MinLengthValidator, RegexValidator
from rest_framework.validators import UniqueValidator
from django.contrib.auth import authenticate

from doctors.models import Doctor
from accounts.serializers import UserSerializer


class DoctorSerializer(serializers.ModelSerializer):
    """
    A Serializer for the Doctor Model, That uses a nested UserSerializer.
    """
    class Meta:
        model = Doctor
        fields = (
            'id',
            'user',
            'specialization',
            'years_of_experience',
            'education',
            'clinic_address',
            'clinic_phone_number',
            'clinic_website',
            'is_approved',
        )

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)

        instance.specialization = validated_data.get('specialization', instance.specialization)
        instance.years_of_experience = validated_data.get('years_of_experience', instance.years_of_experience)
        instance.education = validated_data.get('education', instance.education)
        instance.clinic_address = validated_data.get('clinic_address', instance.clinic_address)
        instance.clinic_phone_number = validated_data.get('clinic_phone_number', instance.clinic_phone_number)
        instance.clinic_website = validated_data.get('clinic_website', instance.clinic_website)
        instance.is_approved = validated_data.get('is_approved', instance.is_approved)

        instance.save()

        return instance
    
    def perform_update(self, serializer):
        serializer.save(user=self.request.user)


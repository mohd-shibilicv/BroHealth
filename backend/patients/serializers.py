import base64
from django.core.files.base import ContentFile
from rest_framework import serializers
from django.core.validators import MinLengthValidator, RegexValidator
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import authenticate
from  rest_framework_simplejwt.tokens import RefreshToken

from patients.models import Patient
from accounts.models import User
from accounts.serializers import UserSerializer


class PatientSerializer(serializers.ModelSerializer):
    """
    A Serializer for the Patient Model.
    """
    class Meta:
        model = Patient
        fields = ('id', 'user', 'medical_history', 'prescription', 'preferred_timezone', 'preferred_language', 'emergency_contact', 'is_verified')

    def update(self, instance, validated_data):
        instance.user = validated_data.get('user', instance.user)
        instance.medical_history = validated_data.get('medical_history', instance.medical_history)
        instance.prescription = validated_data.get('prescription', instance.prescription)
        instance.preferred_timezone = validated_data.get('preferred_timezone', instance.preferred_timezone)
        instance.preferred_language = validated_data.get('preferred_language', instance.preferred_language)
        instance.emergency_contact = validated_data.get('emergency_contact', instance.emergency_contact)
        instance.is_verified = validated_data.get('is_verified', instance.is_verified)

        instance.save()

        return instance

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

from rest_framework import serializers
from django.utils import timezone
import pytz

from patients.models import Patient
from doctors.models import Doctor
from appointments.models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    """
    A Serializer for the Appointment model.
    """
    patient = serializers.PrimaryKeyRelatedField(queryset=Patient.objects.filter(is_verified=True))
    doctor = serializers.PrimaryKeyRelatedField(queryset=Doctor.objects.filter(is_approved=True))

    class Meta:
        model = Appointment
        fields = [
            'id',
            'patient',
            'doctor',
            'consultation_type',
            'date_and_time',
            'status',
            'additional_notes',
            'created_at'
        ]
        read_only_fields = ['created_at']

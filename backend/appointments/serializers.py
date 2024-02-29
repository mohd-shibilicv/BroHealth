from rest_framework import serializers
from django.utils import timezone
import pytz

from patients.models import Patient
from patients.serializers import PatientSerializer
from doctors.models import Doctor
from doctors.serializers import DoctorSerializer
from appointments.models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    """
    A Serializer for the Appointment model.
    """
    patient = PatientSerializer(read_only=True)
    doctor = DoctorSerializer(read_only=True)

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

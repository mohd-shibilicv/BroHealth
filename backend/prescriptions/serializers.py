from rest_framework import serializers

from prescriptions.models import Prescription


class PrescriptionSerializer(serializers.ModelSerializer):
    """
    A serializer for Prescription model
    """
    class Meta:
        model = Prescription
        fields = '__all__'
        read_only_fields = ['prescription_date']

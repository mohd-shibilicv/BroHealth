from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from accounts.permissions import IsPatient
from patients.models import Patient
from doctors.models import Doctor
from appointments.models import Appointment
from appointments.serializers import AppointmentSerializer


class AppointmentListCreateView(generics.ListCreateAPIView):
    """
    API view for listing and creating Appointments.
    """
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        doctor_id = self.request.query_params.get('doctor_id')
        print(doctor_id)
        doctor = get_object_or_404(Doctor, pk=doctor_id)
        patient = get_object_or_404(Patient, user=self.request.user)
        serializer.save(patient=patient, doctor=doctor)


class AppointmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view for retrieving, updating, and deleting Appointments.
    """
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

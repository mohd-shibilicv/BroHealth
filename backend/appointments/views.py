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
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Override the queryset to return appointments based on the user role.
        """
        user = self.request.user
        if Doctor.objects.filter(user=user).exists():
            return Appointment.objects.filter(doctor__user=user)
        elif Patient.objects.filter(user=user).exists():
            return Appointment.objects.filter(patient__user=user)
        else:
            return Appointment.objects.all()

    def perform_create(self, serializer):
        doctor_id = self.request.query_params.get('doctor_id')
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

    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)

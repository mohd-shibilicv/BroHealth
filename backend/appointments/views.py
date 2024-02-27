from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from accounts.permissions import IsPatient
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
        serializer.save(patient=self.request.user.patient)


class AppointmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view for retrieving, updating, and deleting Appointments.
    """
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

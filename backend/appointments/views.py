import json

from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import JsonResponse
from django.views import View

from accounts.permissions import IsPatient
from patients.models import Patient
from doctors.models import Doctor
from appointments.models import Appointment
from appointments.serializers import AppointmentSerializer
from appointments.token04 import generate_token04


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


class AppointmentCancelView(generics.UpdateAPIView):
    """
    API view for canceling Appointments.
    """
    queryset = Appointment.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = AppointmentSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance.status not in ['canceled', 'completed']:
            instance.status = 'canceled'
            instance.save()
            serializer = self.get_serializer(instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Appointment cannot be canceled'}, status=status.HTTP_400_BAD_REQUEST)


class AppointmentRescheduleView(generics.UpdateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        new_date_and_time = request.data.get('date_and_time')
        instance.date_and_time = new_date_and_time
        instance.save()

        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GenerateRoomAccessToken(View):
    def get(self, request, *args, **kwargs):
        # Extract parameters from the request
        app_id = int(request.GET.get('appID'))
        print(app_id)
        server_secret = request.GET.get('serverSecret')
        print(server_secret)
        user_id = request.GET.get('userID')
        print(user_id)

        # Token expiration time, in seconds
        effective_time_in_seconds = 128000

        # Additional configuration information
        payload = {
            "tokenPayload": "" # When generating a basic authentication token, the payload should be set to an empty string
        }

        # Call the function to generate the token
        # Assuming generate_token04 is a function you've defined elsewhere that generates the token
        token_info = generate_token04(app_id, user_id, server_secret, effective_time_in_seconds, json.dumps(payload))
        # Prepare the response
        response_data = {
            "token": token_info.token,
            "error_code": token_info.error_code,
            "message": token_info.error_message
        }
        print(response_data)

        # Return the response
        return JsonResponse(response_data)

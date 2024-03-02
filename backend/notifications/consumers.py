import json

from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync, sync_to_async
from django.http import HttpRequest
from rest_framework.request import Request

from patients.models import Patient
from appointments.models import Appointment
from notifications.models import PatientNotification
from notifications.serializers import (
    PatientNotificationSerializer,
    DoctorNotificationSerializer,
    AdminNotificationSerializer
)
from notifications.views import (
    PatientNotificationList,
    PatientNotificationDetail
)


class PatientNotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.patient_id = self.scope['url_route']['kwargs']['patientID']
        self.patient_group_name = f"patient_{self.patient_id}_group_name"

        print(f'Connecting to room group: {self.patient_group_name}')

        # Add the connection to the patient's channel group
        await self.channel_layer.group_add(
            self.patient_group_name,
            self.channel_name
        )

        await self.accept()
        print(f"WebSocket connected: {self.channel_name}")

    async def disconnect(self, close_code):
        print(f"Websocket disconneting: {self.channel_name}, close_code: {close_code}")

        # Remove the connection from the patient's channel group
        await self.channel_layer.group_discard(
            self.patient_group_name,
            self.channel_name
        )
        print(f"Websocket disconnected: {self.channel_name}")

    async def receive(self, text_data):
        print("Received")
        print(text_data)
        data = json.loads(text_data)
        message = data['message']
        patient_id = data["patientId"]
        appointment_id = data['appointmentId']

        appointment = await sync_to_async(Appointment.objects.get)(id=appointment_id)
        patient = await sync_to_async(Patient.objects.get)(id=patient_id)

        notification = await sync_to_async(PatientNotification.objects.create)(
            patient=patient,
            related_appointment=appointment,
            message=message,
            notification_type=data['notificationType']
        )

        await self.send_group_notification(message)

    async def notification_message(self, event):
        message = event['message']

        # Process the message (e.g., send it to a specific user group)
        await self.send(text_data=json.dumps({'message': message}))

    async def send_group_notification(self, message):
        await self.channel_layer.group_send(
            self.patient_group_name,
            {
                "type": "notification.message",
                "message": message,
            }
        )

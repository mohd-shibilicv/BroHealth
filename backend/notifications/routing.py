from django.urls import path

from notifications import consumers

websocket_urlpatterns = [
    path('ws/notifications/<int:patientID>/', consumers.PatientNotificationConsumer.as_asgi()),
]

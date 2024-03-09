from django.urls import path

from . import consumers

websocket_urlpatterns = [
    path('ws/notifications/<int:patientID>/', consumers.PatientNotificationConsumer.as_asgi()),
    path('ws/chat/<str:room_name>/', consumers.ChatConsumer.as_asgi()),
]

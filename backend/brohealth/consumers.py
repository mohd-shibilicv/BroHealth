import json

from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync, sync_to_async
from django.http import HttpRequest
from rest_framework.request import Request

from doctors.models import Doctor
from appointments.models import Appointment, AppointmentChat, AppointmentRoom


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print(self.scope["user"].role)
        self.room_id = self.scope["url_route"]["kwargs"]["room_id"]
        self.room = await sync_to_async(AppointmentRoom.objects.get)(id=self.room_id)
        self.room_group_name = f"chat_{self.room.id}"

        print(f"Connecting to chat group: {self.room_group_name}")
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        print(f"WebSocket connected: {self.channel_name}")

    async def disconnect(self, close_code):
        print(f"Websocket disconneting: {self.channel_name}, close_code: {close_code}")

        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
        print(f"Websocket disconnected: {self.channel_name}")

    async def receive(self, text_data):
        print("Received")
        print(text_data)
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]

        sender = "doctor" if self.scope["user"].role == "doctor" else "patient"
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": {"content": message, "sender": sender},
            },
        )

    async def chat_message(self, event):
        message = event["message"]

        # Create a new AppointmentChat instance
        await sync_to_async(AppointmentChat.objects.create)(
            room=self.room, sender=self.scope["user"], message=message
        )

        # Send message to WebSocket
        await self.send(text_data=json.dumps({"message": message}))

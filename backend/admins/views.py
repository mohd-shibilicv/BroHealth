from django.shortcuts import render
from rest_framework import viewsets

from admins.models import Admin
from admins.serializers import AdminSerializer
from accounts.permissions import IsAdmin

class AdminModelViewSet(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    permission_classes = [IsAdmin]
    serializer_class = AdminSerializer

from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import login
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView

from accounts.permissions import IsDoctor
from doctors.models import Doctor, DoctorVerification
from doctors.serializers import DoctorSerializer, DoctorVerificationSerializer


class DoctorModelViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    permission_classes = [IsDoctor]
    serializer_class = DoctorSerializer

    def get_queryset(self):
        return Doctor.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)


class DoctorVerificationViewSet(viewsets.ModelViewSet):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticated]
    queryset = DoctorVerification.objects.all()
    serializer_class = DoctorVerificationSerializer

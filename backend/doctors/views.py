from django.shortcuts import get_object_or_404
from datetime import datetime
from rest_framework import generics, viewsets, exceptions
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework import status
from rest_framework.response import Response
from rest_framework.filters import SearchFilter
from django.contrib.auth import login
from django.http import Http404
from django.db.models import Q
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination

from accounts.permissions import IsDoctor
from doctors.models import Doctor, DoctorVerification, DoctorAvailability
from doctors.serializers import DoctorSerializer, DoctorVerificationSerializer, DoctorAvailabilitySerializer


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


class DoctorListView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Doctor.objects.filter(is_approved=True)
        search_term = self.request.query_params.get('search', None)
        if search_term:
            queryset = queryset.filter(
                Q(user__first_name__icontains=search_term) |
                Q(user__last_name__icontains=search_term) |
                Q(specialization__icontains=search_term)
            )
        return queryset

    def get(self, request, format=None):
        queryset = self.get_queryset()
        paginator = PageNumberPagination()
        page = paginator.paginate_queryset(queryset, request)
        serializer = DoctorSerializer(page, many=True)
        return Response(serializer.data)


class DoctorDetailView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_object(self, pk):
        try:
            return Doctor.objects.get(pk=pk)
        except Doctor.DoesNotExist:
            raise Http404("Doctor does not exists.")

    def get(self, request, pk, format=None):
        doctor = self.get_object(pk)
        serializer = DoctorSerializer(doctor)
        return Response(serializer.data)


class DoctorAvailabilityView(generics.ListCreateAPIView):
    """
    API view for listing and creating DoctorAvailability entries.
    """
    serializer_class = DoctorAvailabilitySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Override the queryset to only include availabilities for the logged-in doctor.
        """
        return DoctorAvailability.objects.filter(doctor=self.request.user.doctor)

    def perform_create(self, serializer):
        """
        Override the create process to set the doctor based on the logged-in user.
        """
        doctor = self.request.user.doctor
        serializer.save(doctor=doctor)


class DoctorAvailabilityDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API view for retrieving, updating, and deleting a single DoctorAvailability entry.
    """
    queryset = DoctorAvailability.objects.all()
    serializer_class = DoctorAvailabilitySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        Override the queryset to only include availabilities for the logged-in doctor.
        """
        user = self.request.user
        doctor = get_object_or_404(Doctor, user=user)
        return DoctorAvailability.objects.filter(doctor=doctor)

    def perform_update(self, serializer):
        """
        Override the update process to ensure that only the associated doctor can update the availability.
        """
        user = self.request.user
        doctor = get_object_or_404(Doctor, user=user)
        if serializer.validated_data['doctor'] != doctor:
            raise exceptions.PermissionDenied("You do not have permission to update this availability.")
        serializer.save()

    def perform_destroy(self, instance):
        """
        Override the deletion process to ensure that only the associated doctor can delete the availability.
        """
        user = self.request.user
        doctor = get_object_or_404(Doctor, user=user)
        if instance.doctor != doctor:
            raise exceptions.PermissionDenied("You do not have permission to delete this availability.")
        instance.delete()

from django.shortcuts import get_object_or_404
from django.db import transaction
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response

from admins.models import Admin
from doctors.models import DoctorVerification, VerificationStatusChoices
from admins.serializers import AdminSerializer
from accounts.permissions import IsAdmin

class AdminModelViewSet(viewsets.ModelViewSet):
    queryset = Admin.objects.all()
    permission_classes = [IsAdmin]
    serializer_class = AdminSerializer


@api_view(['POST'])
@permission_classes([IsAdmin])
@transaction.atomic
def approve_doctor_verification(request, verification_id):
    verification = get_object_or_404(DoctorVerification, id=verification_id)

    verification.verification_status = VerificationStatusChoices.APPROVED
    verification.save()

    doctor = verification.doctor
    doctor.is_approved = True
    doctor.save()

    return Response({"message": "Doctor verification approved successfully."}, status=status.HTTP_200_OK)

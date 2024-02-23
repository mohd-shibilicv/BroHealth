import os
from django.shortcuts import get_object_or_404
from django.db import transaction
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
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

    frontend_base_url = os.getenv('FRONTEND_BASE_URL')
    login_url = f"{frontend_base_url}/login"

    # Render the email message
    html_message = render_to_string('verification_approval.html', {
        'doctor': doctor,
        'verification': verification,
        'login_url': login_url
    })

    # Create the email message
    email_message = EmailMultiAlternatives(
        "Account Verification Approved",
        "Please use the link below to login to your account.",
        settings.EMAIL_HOST_USER,
        [doctor.user.email],
    )

    # Send the email
    email_message.attach_alternative(html_message, "text/html")
    email_message.send()

    return Response({"message": "Doctor verification approved successfully."}, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@permission_classes([IsAdmin])
@transaction.atomic
def reject_doctor_verification(request, verification_id):
    verification = get_object_or_404(DoctorVerification, id=verification_id)

    verification.verification_status = VerificationStatusChoices.REJECTED
    verification.save()

    return Response({"message": "Doctor verification rejected."}, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@permission_classes([IsAdmin])
def delete_doctor_verification(request, verification_id):
    verification = get_object_or_404(DoctorVerification, id=verification_id)

    verification.delete()

    return Response({"message": "Doctor verification Deleted."}, status=status.HTTP_204_NO_CONTENT)

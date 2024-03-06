import os

from celery import shared_task
from django.core.mail import EmailMultiAlternatives, send_mail
from django.template.loader import render_to_string
from django.utils import timezone
from django.conf import settings

from appointments.models import Appointment

@shared_task
def send_appointment_reminder_emails():
    # Get appointments that are starting in the next 5 minutes
    current_time = timezone.now()
    five_minutes_later = current_time + timezone.timedelta(minutes=5)

    upcoming_appointments = Appointment.objects.filter(
        date_and_time__range=(current_time, five_minutes_later),
        status='confirmed',
        paid=True
    )
    # frontend_base_url = os.getenv('FRONTEND_BASE_URL')
    # patient_dashboard_route = os.getenv('PATIENT_DASHBOARD_ROUTE')
    # doctor_dashboard_route = os.getenv('DOCTOR_DASHBOARD_ROUTE')
    # patient_login_url = f"{frontend_base_url}/{patient_dashboard_route}"
    # doctor_login_url = f"{frontend_base_url}/{doctor_dashboard_route}"

    for appointment in upcoming_appointments:
        # Render the email message
        # doctor_html_message = render_to_string('appointment_reminder_doctor.html', {
        #     'appointment': appointment,
        #     'doctor': appointment.doctor,
        #     'patient': appointment.patient,
        #     'login_url': doctor_login_url
        # })
        # patient_html_message = render_to_string('appointment_reminder_patient.html', {
        #     'appointment': appointment,
        #     'doctor': appointment.doctor,
        #     'patient': appointment.patient,
        #     'login_url': patient_login_url
        # })

        # # Create the email message
        # doctor_email_message = EmailMultiAlternatives(
        #     "Your appointment is about to start",
        #     "Please use the link below to log in to your dashboard.",
        #     settings.EMAIL_HOST_USER,
        #     [appointment.doctor.user.email],
        # )
        # patient_email_message = EmailMultiAlternatives(
        #     "Your appointment is about to start",
        #     "Please use the link below to log in to your dashboard.",
        #     settings.EMAIL_HOST_USER,
        #     [appointment.patient.user.email],
        # )

        # # Send the email
        # doctor_email_message.attach_alternative(doctor_html_message, "text/html")
        # patient_email_message.attach_alternative(patient_html_message, "text/html")

        # doctor_email_message.send()
        # patient_email_message.send()

        # Prepare email context
        context = {
            'appointment': appointment,
            'doctor': appointment.doctor.user,
            'patient': appointment.patient.user,
        }

        # Send email to the doctor
        send_mail(
            'Your appointment is about to start',
            render_to_string('appointment_reminder_doctor.html', context),
            settings.EMAIL_HOST_USER,
            [appointment.doctor.user.email],
            fail_silently=False,
        )

        # Send email to the patient
        send_mail(
            'Your appointment is about to start',
            render_to_string('appointment_reminder_patient.html', context),
            settings.EMAIL_HOST_USER,
            [appointment.patient.user.email],
            fail_silently=False,
        )

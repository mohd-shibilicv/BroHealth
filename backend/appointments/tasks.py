import pytz

from django.utils import timezone
from django.core.mail import send_mail
from django.conf import settings
from celery import shared_task
from django.core.mail import EmailMultiAlternatives

from appointments.models import Appointment


@shared_task
def send_session_email_task(subject, text_content, html_content, from_email, recipient_list):
    # Create the email message
    message = EmailMultiAlternatives(
        subject,
        text_content,
        from_email,
        recipient_list
    )

    # Attach the HTML version to the email
    message.content_subtype = "html"
    message.attach_alternative(html_content, "text/html")

    # Send the email
    message.send()

    return "Done"


@shared_task
def send_appointment_reminder_emails():
    # Get the current time
    ist_tz = pytz.timezone('Asia/Kolkata')
    now = timezone.now().astimezone(ist_tz)
    appointment = Appointment.objects.get(pk=15)

    # Get all appointments that are due in the next 30 minutes
    upcoming_appointments = Appointment.objects.filter(
        date_and_time__gt=now,
        date_and_time__lte=now + timezone.timedelta(minutes=30),
        status='confirmed',
        paid=True,
        reminder_sent_at__isnull=True
    )
    print(upcoming_appointments)

    if upcoming_appointments:
        for appointment in upcoming_appointments:
            # Send email to patient
            patient_email = appointment.patient.user.email
            patient_subject = f"Appointment Reminder: {appointment.date_and_time.strftime('%Y-%m-%d %H:%M')}"
            patient_message = f"Dear {appointment.patient.user.first_name},\n\nThis is a reminder for your appointment with Dr. {appointment.doctor.user.first_name} {appointment.doctor.user.last_name} scheduled for {appointment.date_and_time.strftime('%Y-%m-%d %H:%M')}.\n\nBest regards,\nYour Healthcare Team"
            send_mail(patient_subject, patient_message, settings.DEFAULT_FROM_EMAIL, [patient_email], fail_silently=False)

            # Send email to doctor
            doctor_email = appointment.doctor.user.email
            doctor_subject = f"Appointment Reminder: {appointment.date_and_time.strftime('%Y-%m-%d %H:%M')}"
            doctor_message = f"Dear Dr. {appointment.doctor.user.first_name} {appointment.doctor.user.last_name},\n\nThis is a reminder for your appointment with {appointment.patient.user.first_name} {appointment.patient.user.last_name} scheduled for {appointment.date_and_time.strftime('%Y-%m-%d %H:%M')}.\n\nBest regards,\nYour Healthcare Team"
            send_mail(doctor_subject, doctor_message, settings.DEFAULT_FROM_EMAIL, [doctor_email], fail_silently=False)

        appointment.reminder_sent_at = timezone.now()
        appointment.save()
    else:
        return "No Upcoming Appointments found for now!"
    
    return 'Done'

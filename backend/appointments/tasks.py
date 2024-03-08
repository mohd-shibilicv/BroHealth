from celery import shared_task
from django.core.mail import EmailMultiAlternatives


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

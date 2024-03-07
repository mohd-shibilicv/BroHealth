from django.urls import path

from appointments.views import (
    AppointmentListCreateView,
    AppointmentDetailView,
    AppointmentCancelView,
    AppointmentRescheduleView,
    GenerateRoomAccessToken,
    send_session_email
)


app_name = "appointments"
urlpatterns = [
    path("", AppointmentListCreateView.as_view(), name="appointment-list-create"),
    path("<int:pk>/", AppointmentDetailView.as_view(), name="appointment-detail"),
    path(
        "<int:pk>/cancel/", AppointmentCancelView.as_view(), name="appointment-cancel"
    ),
    path(
        "<int:pk>/reschedule/",
        AppointmentRescheduleView.as_view(),
        name="appointment-reschedule",
    ),
    path('room_access_token', GenerateRoomAccessToken.as_view(), name='room-access-token'),
    path('send_session_email', send_session_email, name='send-session-email'),
]

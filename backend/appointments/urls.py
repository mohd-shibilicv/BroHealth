from django.urls import path

from appointments.views import AppointmentListCreateView, AppointmentDetailView


app_name = 'appointments'
urlpatterns = [
    path('', AppointmentListCreateView.as_view(), name='appointment-list-create'),
    path('<int:pk>/', AppointmentDetailView.as_view(), name='appointment-detail'),
]
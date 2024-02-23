from django.urls import path

from admins import views
from accounts.views import LogoutView


app_name = 'admins'
urlpatterns = [
    path('doctor-account-verification/<int:verification_id>/approve/', views.approve_doctor_verification, name='approve-doctor-verification'),
]

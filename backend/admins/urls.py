from django.urls import path

from admins import views
from accounts.views import LogoutView


app_name = 'admins'
urlpatterns = [
    path('doctor-account-verification/<int:verification_id>/approve/', views.approve_doctor_verification, name='approve-doctor-verification'),
    path('doctor-account-verification/<int:verification_id>/reject/', views.reject_doctor_verification, name='reject-doctor-verification'),
    path('doctor-account-verification/<int:verification_id>/delete/', views.delete_doctor_verification, name='delete-doctor-verification'),
]

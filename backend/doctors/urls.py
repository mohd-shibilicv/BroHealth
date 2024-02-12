from django.urls import path, include

from doctors import views
from accounts.views import LogoutView


app_name = 'doctors'

urlpatterns = [
    path('register/', views.DoctorRegistrationView.as_view(), name='register'),
    path('login/', views.DoctorLoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
]

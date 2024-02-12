from django.urls import path, include

from patients import views
from accounts.views import LogoutView


app_name = 'patients'

urlpatterns = [
    path('register/', views.PatientRegistrationView.as_view(), name='register'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('protected/', views.ProtectedView.as_view(), name='protected'),
]

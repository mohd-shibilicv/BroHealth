from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'account-verification', views.DoctorVerificationViewSet)

app_name = 'doctors'

urlpatterns = [
    path('api/', include(router.urls)),
    path('', views.DoctorListView.as_view(), name='doctor-list'),
    path('<int:pk>/', views.DoctorDetailView.as_view(), name='doctor-detail'),
    path('doctor-availability/', views.DoctorAvailabilityView.as_view(), name='doctor-availability'),
    path('doctor-availability/<int:pk>/', views.DoctorAvailabilityDetailView.as_view(), name='doctor-availability-detail'),
]

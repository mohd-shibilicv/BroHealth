from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DoctorVerificationViewSet

router = DefaultRouter()
router.register(r'account-verification', DoctorVerificationViewSet)

app_name = 'doctors'

urlpatterns = [
    path('', include(router.urls)),
]

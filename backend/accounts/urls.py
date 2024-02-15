from django.urls import path, include

from accounts import views
from core.viewsets import VerifyAccountView


app_name = 'accounts'

urlpatterns = [
    path('api/auth/activate/<slug:uidb64>/<slug:token>/', VerifyAccountView.as_view({'get': 'retrieve'}), name='activate')
]

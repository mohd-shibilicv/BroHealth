from django.urls import path, include

from doctors import views
from accounts.views import LogoutView


app_name = 'doctors'

urlpatterns = [
    path('logout/', LogoutView.as_view(), name='logout'),
]

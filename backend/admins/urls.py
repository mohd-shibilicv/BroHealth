from django.urls import path

from admins import views
from accounts.views import LogoutView


app_name = 'admins'
urlpatterns = [
    path('logout/', LogoutView.as_view(), name='logout'),
]

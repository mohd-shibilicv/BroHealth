from django.urls import path, include

from accounts import views


app_name = 'accounts'

urlpatterns = [
    path('logout/', views.LogoutView.as_view(), name='logout')
]

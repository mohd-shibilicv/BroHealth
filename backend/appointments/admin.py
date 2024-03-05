from django.contrib import admin

from appointments.models import Appointment


@admin.register(Appointment)
class AppointmentsAdmin(admin.ModelAdmin):
    list_display = ['doctor', 'patient', 'date_and_time', 'status', 'paid']

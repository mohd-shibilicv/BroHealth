from django.contrib import admin

from appointments.models import Appointment


@admin.register(Appointment)
class AppointmentsAdmin(admin.ModelAdmin):
    pass

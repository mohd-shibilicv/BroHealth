from django.contrib import admin

from doctors.models import Doctor, DoctorVerification, Certificate


@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    pass


@admin.register(Certificate)
class DoctorAdmin(admin.ModelAdmin):
    pass


@admin.register(DoctorVerification)
class DoctorVerificationAdmin(admin.ModelAdmin):
    list_display = ('doctor', 'license_number', 'licensure_information', 'verification_status')

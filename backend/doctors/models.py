from django.db import models
from django.conf import settings


class Doctor(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    specialization = models.CharField(max_length=100, blank=True)
    years_of_experience = models.IntegerField(blank=True, null=True)
    education = models.TextField(blank=True)
    clinic_address = models.TextField(blank=True)
    clinic_phone_number = models.CharField(max_length=15, blank=True)
    clinic_website = models.URLField(blank=True)
    is_approved = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'doctor'
        verbose_name_plural = 'doctors'

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"

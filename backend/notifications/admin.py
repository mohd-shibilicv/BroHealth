from django.contrib import admin

from notifications.models import Notification


@admin.site.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    pass

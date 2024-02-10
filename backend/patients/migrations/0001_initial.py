# Generated by Django 5.0.2 on 2024-02-10 08:52

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('medical_history', models.TextField(blank=True)),
                ('prescription', models.TextField(blank=True)),
                ('preferred_timezone', models.CharField(blank=True, max_length=50)),
                ('preferred_language', models.CharField(blank=True, max_length=10)),
                ('emergency_contact', models.JSONField(blank=True, null=True)),
                ('is_verified', models.BooleanField(default=False)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'patient',
                'verbose_name_plural': 'patients',
            },
        ),
    ]

# Generated by Django 5.0.2 on 2024-02-27 04:15

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('doctors', '0002_certificate_doctorverification'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='doctor',
            options={'ordering': ['-years_of_experience'], 'verbose_name': 'doctor', 'verbose_name_plural': 'doctors'},
        ),
        migrations.CreateModel(
            name='DoctorAvailability',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('available_slots', models.JSONField(default=list)),
                ('doctor', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='doctor_availability', to='doctors.doctor')),
            ],
            options={
                'verbose_name': 'doctor availability',
                'verbose_name_plural': 'doctor availabilities',
            },
        ),
    ]

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status

from prescriptions.models import Prescription
from prescriptions.serializers import PrescriptionSerializer


class PrescriptionViewSet(viewsets.ModelViewSet):
    serializer_class = PrescriptionSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        user = self.request.user
        if user.role == "doctor":
            return Prescription.objects.filter(doctor__user=user)
        elif user.role == "patient":
            return Prescription.objects.filter(patient__user=user)
        return Prescription.objects.all()

    def perform_create(self, serializer):
        prescription_image = self.request.FILES.get('prescription_image')
        try:
            if prescription_image:
                serializer.save(prescription_image=prescription_image)
            else:
                serializer.save()
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

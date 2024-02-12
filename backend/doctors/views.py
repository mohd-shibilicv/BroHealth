from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import login

from doctors.models import Doctor
from doctors.serializers import DoctorRegistrationSerializer, DoctorLoginSerializer, DoctorSerializer


class DoctorRegistrationView(generics.CreateAPIView):
    """
    View for Registering new Patients
    """
    permission_classes = (AllowAny,)
    serializer_class = DoctorRegistrationSerializer


class DoctorLoginView(generics.GenericAPIView):
    serializer_class = DoctorLoginSerializer

    def post(self, request):
        serializer = DoctorLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            login(request, user)
            return Response(serializer.create(serializer.validated_data), status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def finalize_response(self, request, response, *args, **kwargs):
        if response.status_code == 200:
            access_token = response.data['access']
            refresh_token = response.data['refresh']
            response.set_cookie('access_token', access_token, httponly=True)
            response.set_cookie('refresh_token', refresh_token, httponly=True)
        return super().finalize_response(request, response, *args, **kwargs)


class DoctorModelViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

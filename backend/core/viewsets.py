from datetime import timedelta
from django.utils import timezone
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.core.mail import EmailMessage
from django.urls import reverse
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_str
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.viewsets import ModelViewSet
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken

from core.serializers import LoginSerializer, RegisterSerializer
from patients.models import Patient


class LoginViewSet(ModelViewSet, TokenObtainPairView):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class RegistrationViewSet(ModelViewSet):
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        user.last_login = timezone.now()
        user.save()

        # Generate the activation token
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        expiration_date = timezone.now() + timedelta(days=1)
        # activation_link = reverse('accounts:activate', kwargs={'uidb64': uid, 'token': token})
        
        # Send the activation email
        mail_subject = 'Activate your account'
        message = render_to_string('acc_activation_email.html', {
            'user': user,
            'domain': get_current_site(request).domain,
            'uid': uid,
            'token': token,
            'protocol': request.scheme,
        })
        email = EmailMessage(mail_subject, message, to=[user.email])
        email.send()

        # Return the response
        return Response({
            'message': 'Verification email has been sent.',
            'email': user.email,
            "user": serializer.data,
        }, status=status.HTTP_201_CREATED)


class VerifyAccountView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, uidb64, token, *args, **kwargs):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = get_user_model().objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, get_user_model().DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            # Check if the token has expired
            if timezone.now() > user.last_login + timedelta(hours=24):
                return Response({'message': 'Activation link has expired!'}, status=status.HTTP_400_BAD_REQUEST)
            user.is_active = True
            patient = Patient.objects.get(user=user)
            patient.is_verified = True
            patient.save()
            user.save()
            return Response({'message': 'Your account has been activated.'}, status=status.HTTP_200_OK)
        return Response({'message': 'Activation link is invalid!'}, status=status.HTTP_400_BAD_REQUEST)


class RefreshViewSet(viewsets.ViewSet, TokenRefreshView):
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)

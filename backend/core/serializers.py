from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from django.contrib.auth.models import update_last_login
from django.core.validators import MinLengthValidator, RegexValidator
from django.contrib.auth.password_validation import validate_password

from rest_framework.validators import UniqueValidator
from django.core.exceptions import ObjectDoesNotExist

from accounts.serializers import UserSerializer
from accounts.models import User
from patients.models import Patient


class LoginSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data['user'] = UserSerializer(self.user).data
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data


class RegisterSerializer(UserSerializer):
    email = serializers.EmailField(
        validators=[UniqueValidator(queryset=User.objects.all(), message="User with that email already exists.")],
        error_messages={
            'unique': 'User with that email already exists.'
        }
    )
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[
            MinLengthValidator(8),
            RegexValidator(
                regex=r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$',
                message='Password must contain at least eight characters, at least one uppercase letter , one number and one special character'
            ),
        ],
        error_messages={
            'blank': 'Password cannot be blank.',
            'required': 'Password is required.'
        }
    )

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'password', 'is_active']

    def create(self, validated_data):
        validated_data['role'] = 'patient'
        try:
            user = User.objects.get(email=validated_data['email'])
        except ObjectDoesNotExist:
            user = User.objects.create_user(**validated_data)
            Patient.objects.create(user=user)
        return user

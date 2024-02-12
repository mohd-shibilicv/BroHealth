from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.core.validators import MinLengthValidator, RegexValidator
from rest_framework.validators import UniqueValidator
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

from doctors.models import Doctor
from accounts.models import User
from accounts.serializers import UserSerializer


class DoctorSerializer(serializers.ModelSerializer):
    """
    A Serializer for the Patient Model, That use nested UserSerializer.
    """
    user = UserSerializer()

    class Meta:
        model = Doctor
        fields = (
            'user',
            'specialization',
            'years_of_experience',
            'education',
            'clinic_address',
            'clinic_phone_number',
            'clinic_website',
            'is_approved',
        )


class DoctorRegistrationSerializer(serializers.Serializer):
    """
    Serializer for registering a new patient.
    """
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
    confirm_password = serializers.CharField(required=True, write_only=True)

    def validate(self, attrs):
        # Check if passwords match
        if attrs.get('password') != attrs.get('confirm_password'):
            raise serializers.ValidationError("Passwords do not match.")
        validate_password(attrs.get('password'))
        return attrs

    def create(self, validated_data):
        user_data = {
            'email': validated_data['email'],
            'first_name': validated_data['first_name'],
            'last_name': validated_data['last_name'],
            'password': validated_data['password'],
            'role': 'doctor',
        }
        user = User.objects.create_user(**user_data)
        doctor = Doctor.objects.create(user=user)
        return user


class DoctorLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            user = authenticate(request=self.context.get('request'), email=email, password=password)
            if user and user.is_active:
                data['user'] = user
                return data
            raise serializers.ValidationError('Incorrect email or password.')
        raise serializers.ValidationError('Please provide both email and password.')

    def create(self, validated_data):
        refresh = RefreshToken.for_user(validated_data['user'])
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters
from rest_framework import status

from accounts.models import User
from accounts.serializers import UserSerializer


class UserModelViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['role']
    ordering = ['-role']

    def get_queryset(self):
        if self.request.user.is_superuser:
            return User.objects.all()

    def get_object(self):
        lookup_field_value = self.kwargs[self.lookup_field]
        obj = User.objects.get(id=lookup_field_value)
        self.check_object_permissions(self.request, obj)
        return obj


class LogoutView(APIView):
    def get(self, request):
        # Get the refresh token from the cookies
        refresh_token = request.COOKIES.get('refresh_token')

        # Blacklist the refresh token
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
            except Exception as e:
                # Handle the exception if the token is invalid or malformed
                print(f"Error blacklisting token: {e}")

        # Delete the JWT tokens from the client's cookies
        response = Response(status=status.HTTP_200_OK)
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')

        return response

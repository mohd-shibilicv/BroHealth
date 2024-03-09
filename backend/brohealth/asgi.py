import os

from django.core.asgi import get_asgi_application

# Set the Django settings module
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "brohealth.settings")

# Get the base ASGI application
django_asgi_app = get_asgi_application()

# Import other modules/components after setting up the Django environment
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator
from brohealth import routing

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            URLRouter(routing.websocket_urlpatterns)
        )
    ),
})

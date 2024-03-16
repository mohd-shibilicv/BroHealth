import os
from dotenv import load_dotenv

load_dotenv()

ENVIRONMENT = os.getenv("DJANGO_ENV", "development")

if ENVIRONMENT == "production":
    from .prod_settings import *
else:
    from .dev_settings import *

import os
from datetime import timedelta
from pathlib import Path

import django_stubs_ext
from dotenv import load_dotenv

django_stubs_ext.monkeypatch()


# Build paths inside the project like this: BASE_DIR / "subdir".
BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / ".." / ".env")

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get("SECRET_KEY")

# Local dev defaults to True so `make` just works; production must set this
# explicitly (compose .env has DEBUG=false).
DEBUG = os.environ.get("DEBUG", "True").strip().lower() in ("1", "true", "yes")

# ALLOWED_HOST — feeds ALLOWED_HOSTS, CORS, and CSRF_TRUSTED below.
ALLOWED_HOST = os.environ.get("ALLOWED_HOST", "localhost")

ALLOWED_HOSTS = [
  "127.0.0.1",
  "localhost",
  ALLOWED_HOST,
]


# Application definition

INSTALLED_APPS = [
  "django.contrib.auth",
  "django.contrib.contenttypes",
  "django.contrib.sessions",
  "django.contrib.messages",
  "django.contrib.staticfiles",
  # project's apps
  "accounts.apps.AccountsConfig",
  "adminstration.apps.AdminstrationConfig",
  "awqaf.apps.AwqafConfig",
  "comings.apps.ComingsConfig",
  "globals.apps.GlobalsConfig",
  "money.apps.MoneyConfig",
  "points.apps.PointsConfig",
  "students.apps.StudentsConfig",
  "reports.apps.ReportsConfig",
  "commands.apps.CommandsConfig",
  # installed apps
  "rest_framework",
  "rest_framework_simplejwt.token_blacklist",
  "corsheaders",
  "drf_spectacular",
  "django_filters",
]

MIDDLEWARE = [
  "django.middleware.security.SecurityMiddleware",
  # Serves /static/ from STATIC_ROOT in production (there is no nginx in front
  # of Gunicorn anymore — see docker-compose.prod.yml).
  "whitenoise.middleware.WhiteNoiseMiddleware",
  "django.contrib.sessions.middleware.SessionMiddleware",
  # for external app
  "corsheaders.middleware.CorsMiddleware",
  "django.middleware.common.CommonMiddleware",
  "django.middleware.csrf.CsrfViewMiddleware",
  "django.contrib.auth.middleware.AuthenticationMiddleware",
  "django.contrib.messages.middleware.MessageMiddleware",
  "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "backend.urls"

TEMPLATES = [
  {
    "BACKEND": "django.template.backends.django.DjangoTemplates",
    "DIRS": [BASE_DIR / "templates"],
    "APP_DIRS": True,
  },
]

WSGI_APPLICATION = "backend.wsgi.application"


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases
DATABASES = {
  "default": {
    "ENGINE": "django.db.backends.sqlite3",
    "NAME": BASE_DIR.parent / "db.sqlite3",
  }
}

# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
  {
    "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
  },
  {
    "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
  },
  {
    "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
  },
  {
    "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
  },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = "ar"

TIME_ZONE = "Asia/Damascus"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = "static/"
STATICFILES_DIRS = [BASE_DIR / "static"]
STATIC_ROOT = BASE_DIR.parent / "staticfiles"

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR.parent / "media"

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# configurations for external apps

REST_FRAMEWORK = {
  "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
  "DEFAULT_AUTHENTICATION_CLASSES": (
    "rest_framework_simplejwt.authentication.JWTAuthentication",
  ),
  "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
  "PAGE_SIZE": 20,
}

SIMPLE_JWT = {
  "ACCESS_TOKEN_LIFETIME": timedelta(hours=1),
  "REFRESH_TOKEN_LIFETIME": timedelta(weeks=4),
  "ROTATE_REFRESH_TOKENS": True,
  "BLACKLIST_AFTER_ROTATION": True,
}

# here 4200 is the default port of angular app in development mode
# and 8000 port is for django app in development mode
CORS_ALLOWED_ORIGINS = [
  "http://localhost:8000",
  "http://localhost:4200",
  "http://127.0.0.1:8000",
  "http://127.0.0.1:4200",
  f"https://{ALLOWED_HOST}",
  f"http://{ALLOWED_HOST}",
]

# drf-spectacular settings
SPECTACULAR_SETTINGS = {
  "TITLE": "Zidnahum Hudaa Project API",
  "VERSION": "1.0.0",
  "SERVE_INCLUDE_SCHEMA": False,
  "SCHEMA_PATH_PREFIX": "/api/v1",
  "POSTPROCESSING_HOOKS": [
    "backend.schema_hooks.disambiguate_duplicate_schema_names",
    "backend.schema_hooks.set_enum_varnames",
  ],
}


# logging
LOGGING = {
  "version": 1,
  "disable_existing_loggers": False,
  "handlers": {
    "console": {"class": "logging.StreamHandler"},
  },
  "loggers": {
    "django.request": {
      "handlers": ["console"],
      "level": "ERROR",
      "propagate": False,
    },
  },
}

# constants
Q_COMING_CATEGORY_ID = int(os.environ.get("Q_COMING_CATEGORY_ID", "1"))

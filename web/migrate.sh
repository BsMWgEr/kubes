#!/bin/bash
DJANGO_SUPERUSER_EMAIL=${DJANGO_SUERPUSER_EMAIL}
DJANGO_SUPERUSER_EMAIL=${DJANGO_SUERPUSER_USERNAME}
DJANGO_SUPERUSER_EMAIL=${DJANGO_SUERPUSER_PASSWORD}
cd /app/
/opt/venv/bin/python manage.py migrate --noinput
/opt/venv/bin/python manage.py createsuperuser --username $DJANGO_SUPERUSER_USERNAME --password $DJANGO_SUERPUSER_PASSWORD  --email $SUPERUSER_EMAIL --noinput || true


# If you have email setup in Django, uncomment the following: 
# /opt/venv/bin/python manage.py sendtestemail --admins
#!/bin/bash
DJANGO_SUPERUSER_EMAIL=${DJANGO_SUERPUSER_EMAIL:-"jonmcgaha@icloud.com"}
cd /app/
/opt/venv/bin/python manage.py migrate --noinput


# If you have email setup in Django, uncomment the following: 
# /opt/venv/bin/python manage.py sendtestemail --admins
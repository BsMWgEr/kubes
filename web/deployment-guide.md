1.  Test Django
'''
python manage.py test
'''

2.   Build Container
'''
cd web
docker build -f Dockerfile \
     -t registry.digitalocean.com/jsquad/django-k8s-web:latest \
     -t registry.digitalocean.com/jsquad/django-k8s-web:v1 .
'''

3.  Push container to Digital Ocean registry
'''
docker push registry.digitalocean.com/jsquad/django-k8s-web --all-tags
'''

4.  Update secrets
'''
kubectl delete secret django-k8-web-prod-env
kubectl create secret generic django-k8-web-prod-env \
--from-env-file=web/.env.prod
'''

5.  Update Deployment
'''
kubectl apply -f k8s/apps/django-k8s-web.yaml
'''

6.  Wait for Rollout to Finish
'''
kubectl rollout status deployment/django-k8s-web-deployment
'''

7.  Migrate Database
'''
either:
export SINGLE_POD_NAME=$(kubectl get pod \
    -l app=django-k8s-web-deployment \
    -o jsonpath="{.items[0].metadata.name}")

or:
export SINGLE_POD_NAME=$(kubectl get pod \
-l=app=django-k8s-web-deployment -o NAME | tail -n 1)

'''
then migrate:
kubectl exec -it $SINGLE_POD_NAME -- bash /app/migrate.sh
'''

Extra commands:
'''
django secret key generator:
python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
django password generator URL safe:
python -c 'import secrets;print(secrets.token_urlsafe(32))'


kubect exec -it <podname> -- /bin/bash
'''
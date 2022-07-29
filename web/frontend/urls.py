from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home'),
    path('api', views.api),
    path('question', views.question),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('quiz-id', views.quiz_id_generator),
    path('results/', views.results_view)
]

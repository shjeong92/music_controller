from . import views
from django.urls import path

app_name = 'frontend'

urlpatterns = [  
    path('', views.index, name=''),
    path('join', views.index, name='join'),
    path('create', views.index, name='create'),
    path('room/<str:roomCode>', views.index),
]

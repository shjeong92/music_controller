from . import views
from django.urls import path
urlpatterns = [  
    path('', views.index),
    path('join', views.index),
    path('create', views.index),
    path('join/1', views.index),
]

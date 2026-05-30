from django.urls import path
from . import views

urlpatterns = [
    path('stories/', views.story_list, name='story-list'),
    path('stories/<int:pk>/', views.story_detail, name='story-detail'),
]
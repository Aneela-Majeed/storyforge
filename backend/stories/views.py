from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Story
from django.contrib.auth.models import User

@api_view(['GET', 'POST'])
def story_list(request):
    if request.method == 'GET':
        stories = Story.objects.all()
        data = [{'id': s.id, 'title': s.title, 'description': s.description, 'author': s.author.username} for s in stories]
        return Response(data)
    
    elif request.method == 'POST':
        user = User.objects.first()
        if not user:
            user = User.objects.create_user('demo', 'demo@example.com', 'demo123')
        story = Story.objects.create(
            title=request.data['title'],
            description=request.data.get('description', ''),
            author=user
        )
        return Response({'id': story.id, 'title': story.title, 'description': story.description}, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def story_detail(request, pk):
    try:
        story = Story.objects.get(pk=pk)
    except Story.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        data = {'id': story.id, 'title': story.title, 'description': story.description, 'author': story.author.username}
        return Response(data)
    
    elif request.method == 'DELETE':
        story.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
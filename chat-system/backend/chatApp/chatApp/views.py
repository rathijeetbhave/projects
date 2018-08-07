from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from chatApp.serializers import UserSerializer, GroupSerializer, FriendSerializer, ChatSerializer
from chatApp.models import Friend, Chat
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status, mixins
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser

class UserViewSet(viewsets.ModelViewSet) :
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def list(self, request) :
        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK) 

    def create(self, request) :
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,  status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
class FriendViewSet(viewsets.ModelViewSet) :
    queryset = Friend.objects.all()
    serializer_class = FriendSerializer

    def list(self, request) :
        data = self.queryset.select_related('user').filter(from_user_id = request.user.id)
        serializer = self.get_serializer(self.queryset, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

class ChatViewSet(viewsets.ModelViewSet) :
    permission_classes = (IsAuthenticated,)
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer

    def list(self, request) :
        to_user_id = request.GET.get('to_user_id')
        if not to_user_id :
            return Response("Please select a friend", status=status.HTTP_400_BAD_REQUEST)

        sent_to = User.objects.filter(id = to_user_id)
        if not sent_to.exists() :
            return Response("Invalid friend Id supplied", status=status.HTTP_400_BAD_REQUEST)

        sent_by = request.user
        print request.__dict__
        sent_to = sent_to[0]

        chats = self.queryset.filter(
            sent_to_id__in = [sent_to.id, sent_by.id],
            sent_by_id__in = [sent_by.id, sent_to.id]
        ).order_by('id')
        print sent_to.id, sent_by.id

        serializer = self.get_serializer(chats, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



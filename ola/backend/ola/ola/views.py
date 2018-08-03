from django.contrib.auth.models import User
from rest_framework import viewsets
from ola.serializers import UserSerializer, RideSerializer
from ola.models import Driver, Ride
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status, mixins
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from ola.tasks import send_feedback_email_task

class UserViewSet(viewsets.ModelViewSet) :
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def list(self, request) :
        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK) 

    def create(self, request) :
        username = request.data.get('username', '')
        password = request.data.get('password', '')
        user = User.objects.create_user(username=username, password=password)
        user.save()
        return Response("user created", status=status.HTTP_200_OK)

class RideViewSet(viewsets.ModelViewSet) :
    queryset = Ride.objects.all()
    serializer_class = RideSerializer

    def create(self, request) :
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid() :
            serializer.save()
            return Response(serializer.data,  status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, pk) :
        ride = self.queryset.get(id = pk)
        ride.driver = Driver.objects.get(user_id=request.user.id)
        ride.save()
        send_feedback_email_task.delay()
        return Response("ride booked", status=status.HTTP_200_OK)



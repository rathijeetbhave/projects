from django.contrib.auth.models import User, Group
from rest_framework import serializers
from ola.models import Ride

class UserSerializer(serializers.ModelSerializer) :
    def validate(self, data) :
        fields = ('username', 'password')
        for field in fields :
            if field in data :
                if data[field] == '' or data[field] == None :
                    raise serializers.ValidationError("username and password cannot be null")
        return data

    class Meta :
        model = User
        fields = ('id', 'username', 'email')

class RideSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Ride
        fields = '__all__'


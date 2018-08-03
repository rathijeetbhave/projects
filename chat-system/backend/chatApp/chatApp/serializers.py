from django.contrib.auth.models import User, Group
from rest_framework import serializers
from chatApp.chat_app.models import Friend, Chat

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
        fields = ('id', 'username', 'email', 'groups')

class GroupSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Group
        fields = ('id', 'name')

class FriendSerializer(serializers.ModelSerializer) :
    username = serializers.SerializerMethodField()
    user_id = serializers.SerializerMethodField()

    def get_username(self, obj) :
        return obj.to_user.username

    def get_user_id(self, obj) :
        return obj.to_user.id

    class Meta :
        model = Friend
        fields = ('user_id', 'username')

class ChatSerializer(serializers.ModelSerializer) :
    class Meta :
        model = Chat
        fields = '__all__'

# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Chat(models.Model) :
    sent_by = models.ForeignKey(User, null=True, blank=True, related_name='sent_by')
    sent_to = models.ForeignKey(User, null=True, blank=True, related_name='sent_to')
    message = models.CharField(max_length=128, null=True)
    sent_on = models.DateTimeField(auto_now_add=True)

class Friend(models.Model) :
    from_user = models.ForeignKey(User, related_name='from_user')
    to_user = models.ForeignKey(User, related_name='to_user')
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self) :
        return self.from_user.username + " -> " + self.to_user.username

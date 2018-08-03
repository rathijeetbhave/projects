# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Driver(models.Model) :
    user = models.ForeignKey(User, null=True, blank=True, related_name='driver')

class Ride(models.Model) :
    WAITING = 'W'
    ONGOING = 'O'
    COMPLETED = 'C'
    STATUS = (
        (WAITING, 'Waiting'),
        (ONGOING, 'On-going'),
        (COMPLETED, 'Completed'),
    )

    rider = models.ForeignKey(User, related_name='rider')
    driver = models.ForeignKey(Driver, related_name='driver', null=True, blank=True)
    status = models.CharField(max_length=2, choices=STATUS, default=WAITING)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True, null=True)






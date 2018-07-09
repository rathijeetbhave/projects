from django.conf.urls import url, include
from rest_framework import routers
from chatApp.chat_app.views import UserViewSet
from rest_framework.authtoken import views as vw

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'login', vw.obtain_auth_token)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]

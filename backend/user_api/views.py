from django.contrib.auth import login, logout
from django.core.exceptions import ValidationError
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer
from rest_framework import permissions, status
from .validations import custom_validation
from django.contrib.auth import update_session_auth_hash
from rest_framework.generics import UpdateAPIView
from rest_framework import status
# validate_email, validate_password
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator

class UserRegister(APIView):
	permission_classes = (permissions.AllowAny,)
	def post(self, request):
		try:
			clean_data = custom_validation(request.data)
			serializer = UserRegisterSerializer(data=clean_data)
			if serializer.is_valid():
				user = serializer.create(clean_data)
				user.save()
				return Response(serializer.data, status=status.HTTP_201_CREATED)
			else:
				return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
		except ValidationError as e:
			error_message = e.message if hasattr(e, 'message') else str(e)
			return Response(error_message, status=status.HTTP_400_BAD_REQUEST)

class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (SessionAuthentication,)

	def post(self, request):
		try:
			data = request.data
			clean_data = {
				'email': data.get('email', '').strip(),
				'password': data.get('password', '').strip()
			}
			serializer = UserLoginSerializer(data=clean_data)
			if serializer.is_valid():
				user = serializer.check_user(clean_data)
				login(request, user)
				return Response(serializer.data, status=status.HTTP_200_OK)
			else:
				return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
		except ValidationError as e:
			error_message = e.message if hasattr(e, 'message') else str(e)
			return Response(error_message, status=status.HTTP_400_BAD_REQUEST)

class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)

class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,) 	
	##
	def get(self, request):
		serializer = UserSerializer(request.user)
		return Response(serializer.data, status=status.HTTP_200_OK)

@method_decorator(ensure_csrf_cookie, name='dispatch')
class UserProfileUpdate(UpdateAPIView):

	serializer_class = UserSerializer
	permission_classes = (permissions.IsAuthenticated,)

	def get_object(self):
		return self.request.user
	
	def update(self, request, *args, **kwargs):
		instance = self.get_object()
		serializer = self.get_serializer(instance, data=request.data)
		serializer.is_valid(raise_exception=True)
		self.perform_update(serializer)
		update_session_auth_hash(request, instance)
		return Response(serializer.data)
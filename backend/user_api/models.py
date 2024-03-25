from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

class AppUserManager(BaseUserManager):
	def create_user(self, email, password=None):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		email = self.normalize_email(email)
		user = self.model(email=email)
		user.set_password(password)
		user.save()
		return user
	def create_superuser(self, email, password=None, **extra_fields):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		email = self.normalize_email(email)
		user = self.model(email=email, **extra_fields)
		# user = self.create_user(email, password)
		user.is_staff = True
		user.is_superuser = True
		user.set_password(password)
		user.save(using=self._db)
		return user


class AppUser(AbstractBaseUser, PermissionsMixin):
	user_id = models.AutoField(primary_key=True)
	email = models.EmailField(max_length=50, unique=True)
	username = models.CharField(max_length=50)
	firstname = models.CharField(max_length=50, blank=True)
	lastname = models.CharField(max_length=50, blank=True)
	contact = models.CharField(max_length=15, blank=True)
	is_staff = models.BooleanField(default=False)
	user_profile = models.ImageField(null=True, blank=True, upload_to='images/')
	
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['username']
	objects = AppUserManager()
	def __str__(self):
		return self.username

class CarListing(models.Model):
	TRANSMISSION_CHOICES = [
    ('automatic', 'Automatic'),
    ('manual', 'Manual'),
	]		
	make = models.CharField(max_length=50)
	model = models.CharField(max_length=50)
	model_year = models.PositiveIntegerField()
	daily_rate = models.IntegerField()
	transmission = models.CharField(max_length=20, choices=TRANSMISSION_CHOICES)
	image_file = models.ImageField(blank=False, upload_to='car_images/')
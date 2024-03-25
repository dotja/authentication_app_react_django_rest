from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
UserModel = get_user_model()


def custom_validation(data):
    email = data.get('email', '').strip()
    username = data.get('username', '').strip()
    password = data.get('password', '').strip()

    if not email:
        raise ValidationError('Please provide an email.')

    if UserModel.objects.filter(email=email).exists():
        raise ValidationError('This email is already in use.')

    if not password or len(password) < 8:
        raise ValidationError('Password needs to be at least 8 characters.')

    if not username:
        raise ValidationError('Please provide a username.')

    return data
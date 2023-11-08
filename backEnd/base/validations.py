from .models import User


def validate_password(passowrd, confirm_password):
    if passowrd != confirm_password:
        return {"error": "Passowrds do not match.", "id": [-1]}
    return {}


def is_user_exist(username):
    try:
        user = User.objects.get(username=username)
        return {"error": "User already exist.", "id": [-2]}
    except User.DoesNotExist:
        return {}


def is_not_empty(data):
    is_empty = []
    keys = list(data.keys())
    i = 0
    for key in keys:
        if data[key] == "":
            is_empty.append(i)
        i += 1
    if is_empty:
        return {"error": "Fields with * are required.", "id": is_empty}
    else:
        return {}


def is_email_in_use(email):
    try:
        user = User.objects.get(email=email)
        return {"error": "Email in use.", "id": [-3]}
    except User.DoesNotExist:
        return {}

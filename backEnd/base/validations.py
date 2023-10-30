def validate_password(passowrd, confirm_password):
    if not passowrd:
        return {"error": "Passowrd required.", "id": 0}
    if not confirm_password:
        return {"error": "Confirm passowrd required", "id": 1}
    if passowrd != confirm_password:
        return {"error": "Passowrds do not match", "id": -1}
    return {}

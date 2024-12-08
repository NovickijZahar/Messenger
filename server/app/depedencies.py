from fastapi import Request, HTTPException
from app.services import user_service

async def check_auth(req: Request):
    try:
        token = req.headers.get('Authorization').split()[1]
        return {**user_service.decode_token(token), 'token': token}
    except:
        raise HTTPException(status_code=401, detail={"success": False, "message": "Нет доступа"})
    


async def check_admin(req: Request):
    try:
        token = req.headers.get('Authorization').split()[1]
        user = user_service.decode_token(token)
        if user['role'] != 'admin':
            raise HTTPException(status_code=401, detail={"success": False, "message": "Нет доступа"})
        return user
    except Exception as e:
        raise HTTPException(status_code=401, detail={"success": False, "message": "Нет доступа"})
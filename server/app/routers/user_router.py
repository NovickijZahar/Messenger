from fastapi import APIRouter, Depends
from app.services import user_service
from ..schemas import User
from app.depedencies import *

router = APIRouter()

@router.get('/')
async def get_all_users():
    return user_service.get_all_users()


@router.post('/register')
async def register(user: User):
    return user_service.register(user=user)


@router.post('/login')
async def login(user: User):
    return user_service.login(user=user)


@router.get('/profile')
async def profile(decoded_data: dict = Depends(check_auth)):
    return decoded_data


@router.get('/admin', dependencies=[Depends(check_admin)])
async def admin(decoded_data: dict = Depends(check_auth)):
    return decoded_data
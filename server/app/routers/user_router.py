from fastapi import APIRouter, Depends
from app.services import user_service
from ..schemas import User, Profile
from app.depedencies import check_admin, check_auth

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


@router.get('/check')
async def check(decoded_data: dict = Depends(check_auth)):
    return decoded_data


@router.get('/admin', dependencies=[Depends(check_admin)])
async def admin(decoded_data: dict = Depends(check_auth)):
    return decoded_data


@router.get('/my_profile')
async def my_profile(decoded_data: dict = Depends(check_auth)):
    return user_service.profile(userId=decoded_data['id'])


@router.get('/profile/{id}')
async def profile(id: int):
    return user_service.profile(userId=id)


@router.patch('/profile')
async def update_profile(profile: Profile, decoded_data: dict = Depends(check_auth)):
    return user_service.update_profile(profile=profile, userId=decoded_data['id'])
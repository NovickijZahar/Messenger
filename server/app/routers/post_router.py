from fastapi import APIRouter, Depends
from app.depedencies import check_admin, check_auth
from app.services import post_service
from ..schemas import Post


router = APIRouter()


@router.get('/')
async def get_all_posts():
    return post_service.get_all_posts()


@router.get('/my_posts')
async def get_my_posts(decoded_data: dict = Depends(check_auth)):
    return post_service.get_user_posts(userId=decoded_data['id'], myId=decoded_data['id'])


@router.post('/my_posts')
async def create_post(post: Post, decoded_data: dict = Depends(check_auth)):
    return post_service.create_post(post=post, userId=decoded_data['id'])


@router.patch('/my_posts/{id}')
async def update_post(post: Post, id:int, decoded_data: dict = Depends(check_auth)):
    return post_service.update_post(post=post, id=id, userId=decoded_data['id'])


@router.delete('/my_posts/{id}')
async def remove_post(id: int, decoded_data: dict = Depends(check_auth)):
    return post_service.remove_post(id=id, userId=decoded_data['id'])


@router.get('/{userId}')
async def get_user_posts(userId: int, decoded_data: dict = Depends(check_auth)):
    return post_service.get_user_posts(userId=userId, myId=decoded_data['id'])


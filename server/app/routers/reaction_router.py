from fastapi import APIRouter, Depends
from app.depedencies import check_admin, check_auth
from app.services import reaction_service


router = APIRouter()

@router.post('/send_post_like/{id}')
async def send_post_like(id: int, decoded_data: dict=Depends(check_auth)):
    return reaction_service.send_post_like(postId=id, userId=decoded_data['id'])

@router.post('/send_post_dislike/{id}')
async def send_post_dislike(id: int, decoded_data: dict=Depends(check_auth)):
    return reaction_service.send_post_dislike(postId=id, userId=decoded_data['id'])

@router.post('/send_poll_like/{id}')
async def send_post_dislike(id: int, decoded_data: dict=Depends(check_auth)):
    return reaction_service.send_poll_dislike(pollId=id, userId=decoded_data['id'])

@router.post('/send_poll_dislike/{id}')
async def send_post_dislike(id: int, decoded_data: dict=Depends(check_auth)):
    return reaction_service.send_poll_dislike(pollId=id, userId=decoded_data['id'])
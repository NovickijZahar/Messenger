from fastapi import APIRouter, Depends
from app.depedencies import check_auth
from app.services import poll_service
from ..schemas import Poll

router = APIRouter()


@router.get('/my_polls')
async def get_my_polls(decoded_data: dict = Depends(check_auth)):
    return poll_service.get_user_polls(userId=decoded_data['id'])


@router.post('/my_polls')
async def create_poll(poll: Poll, decoded_data: dict = Depends(check_auth)):
    return poll_service.create_poll(userId=decoded_data['id'], poll=poll)


@router.delete('/my_polls/{id}')
async def remove_poll(id: int, decoded_data: dict = Depends(check_auth)):
    return poll_service.remove_poll(id=id, userId=decoded_data['id'])
from fastapi import APIRouter, Depends
from app.depedencies import check_auth
from app.services import message_service
from ..schemas import Message

router = APIRouter()


@router.post('/')
async def send_message(message: Message, decoded_data: dict = Depends(check_auth)):
    return message_service.send_message(userId=decoded_data['id'], message=message)


@router.get('/{id}')
async def get_chat(id: int, decoded_data: dict = Depends(check_auth)):
    return message_service.get_chat(myId=decoded_data['id'], otherId=id)


@router.patch('/{id}')
async def edit_message(id: int, message: Message, decoded_data: dict = Depends(check_auth)):
    return message_service.edit_message(id=id, message=message, userId=decoded_data['id'])


@router.delete('/{id}')
async def remove_message(id: int, decoded_data: dict = Depends(check_auth)):
    return message_service.remove_message(id=id, userId=decoded_data['id'])
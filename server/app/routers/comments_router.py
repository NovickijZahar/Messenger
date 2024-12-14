from fastapi import APIRouter, Depends
from app.depedencies import check_auth
from app.services import comments_service
from ..schemas import Comment

router = APIRouter()

@router.get('/{id}')
async def get_all_comments(id: int):
    return comments_service.get_all_comments(id=id)


@router.post('/{id}')
async def send_comment(id: int, comment: Comment, decoded_data: dict = Depends(check_auth)):
    return comments_service.send_comment(id=id, comment=comment, userId=decoded_data['id'])
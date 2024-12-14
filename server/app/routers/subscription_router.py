from fastapi import APIRouter, Depends
from app.depedencies import check_admin, check_auth
from app.services import subscription_service

router = APIRouter()

@router.post('/subscribe/{id}')
def subsribe(id: int, decoded_data: dict = Depends(check_auth)):
    return subscription_service.subscribe(rId=id, sId=decoded_data['id'])


@router.post('/desubscribe/{id}')
def desubscribe(id: int, decoded_data: dict = Depends(check_auth)):
    return subscription_service.desubscribe(rId=id, sId=decoded_data['id'])

@router.get('/check_sub/{id}')
def check_sub(id: int, decoded_data: dict = Depends(check_auth)):
    return subscription_service.check_sub(rId=id, sId=decoded_data['id'])
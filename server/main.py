from fastapi import FastAPI
from app.routers import user_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

app.include_router(user_router.router, prefix='/users', tags=['users'])

@app.get('/')
async def main():
    return "1"
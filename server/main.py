from fastapi import FastAPI
from app.routers import user_router, post_router, poll_router, message_router, reaction_router, subscription_router, comments_router
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
app.include_router(post_router.router, prefix='/posts', tags=['posts'])
app.include_router(poll_router.router, prefix='/polls', tags=['polls'])
app.include_router(message_router.router, prefix='/messages', tags=['messages'])
app.include_router(reaction_router.router, prefix='/reactions', tags=['reactions'])
app.include_router(subscription_router.router, prefix='/subscription', tags=['subscription'])
app.include_router(comments_router.router, prefix='/comments', tags=['comments'])

@app.get('/')
async def main():
    return "1"
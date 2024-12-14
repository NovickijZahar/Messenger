from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

class User(BaseModel):
    login: str = Field(..., min_length=4)
    password: str = Field(..., min_length=8)


class Post(BaseModel):
    content: str
    

class Poll(BaseModel):
    title: str
    description: Optional[str] = Field(default='')
    choices: List[str]


class Message(BaseModel):
    content: str
    receiverId: int


class Reaction(BaseModel):
    postId: Optional[int]
    pollId: Optional[int]


class Profile(BaseModel):
    telephone: str
    email: str
    bio: str


class Comment(BaseModel):
    content: str
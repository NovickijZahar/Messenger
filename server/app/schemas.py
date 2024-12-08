from pydantic import BaseModel, Field

class User(BaseModel):
    login: str = Field(..., min_length=4)
    password: str = Field(..., min_length=8)
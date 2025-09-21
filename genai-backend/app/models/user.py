from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from uuid import uuid4

# user models

class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(UserBase):
    password: str

class UserGoogleCreate(UserBase):
    google_id: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserInDB(UserBase):
    id: str = Field(default_factory=lambda: str(uuid4()), alias="_id")
    hashed_password: Optional[str] = None
    google_id: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    class Config:
        populate_by_name = True

class User(UserBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        populate_by_name = True

# auth models

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

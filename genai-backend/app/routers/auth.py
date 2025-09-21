import os
from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import jwt, JWTError
from datetime import timedelta, datetime
from typing import Optional
from dotenv import load_dotenv

from app.models import User, UserCreate, Token, TokenData
from app.database import create_user, get_user_by_email, verify_password

load_dotenv()

router = APIRouter(prefix="/auth", tags=["authentication"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")


# --- JWT Utility ---
def create_access_token(data: dict):
    to_encode = data.copy()
    expire_minutes = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
    expire = datetime.utcnow() + timedelta(minutes=expire_minutes)
    to_encode.update({"exp": expire})
    try:
        secret_key = os.getenv("SECRET_KEY", "your-secret-key")
        algorithm = os.getenv("ALGORITHM", "HS256")
        return jwt.encode(to_encode, secret_key, algorithm=algorithm)
    except JWTError as e:
        raise HTTPException(status_code=500, detail=f"Token generation failed: {e}")


def verify_token(token: str) -> Optional[TokenData]:
    """Verify JWT token and return token data"""
    try:
        secret_key = os.getenv("SECRET_KEY", "your-secret-key")
        algorithm = os.getenv("ALGORITHM", "HS256")
        payload = jwt.decode(token, secret_key, algorithms=[algorithm])
        email: str = payload.get("sub")
        if email is None:
            return None
        return TokenData(email=email)
    except JWTError:
        return None


async def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    """Get current authenticated user"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    token_data = verify_token(token)
    if token_data is None:
        raise credentials_exception
    
    user_doc = await get_user_by_email(token_data.email)
    if user_doc is None:
        raise credentials_exception
    
    return User(**user_doc)


# --- Routes ---
@router.post("/signup", response_model=User, status_code=status.HTTP_201_CREATED)
async def signup(user_data: UserCreate):
    """Create a new user account"""
    try:
        user = await create_user(user_data)
        if not user:
            raise HTTPException(status_code=400, detail="Email already registered")
        return User(**user.dict())
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """Login with email and password"""
    try:
        user_doc = await get_user_by_email(form_data.username)
        if not user_doc or not verify_password(form_data.password, user_doc["hashed_password"]):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )

        access_token = create_access_token(data={"sub": user_doc["email"]})
        return Token(access_token=access_token, token_type="bearer")

    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))

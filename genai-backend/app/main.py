import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import connect_to_mongo, close_mongo_connection
from app.routers import user
from contextlib import asynccontextmanager
from app.routers import auth
from dotenv import load_dotenv
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from typing import Optional
from fastapi import Request
from fastapi.responses import JSONResponse

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_to_mongo()
    yield
    await close_mongo_connection()

app = FastAPI(title="LegalAI Backend", version="1.0.0", lifespan=lifespan)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

def verify_token(token: str) -> Optional[str]:
    """Verify JWT token and return email"""
    try:
        payload = jwt.decode(token, os.getenv("SECRET_KEY", "your-secret-key"), algorithms=[os.getenv("ALGORITHM", "HS256")])
        email: str = payload.get("sub")
        if email is None:
            return None
        return email
    except JWTError:
        return None

async def get_current_user(token: str = Depends(oauth2_scheme)):
    """Get current authenticated user"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    email = verify_token(token)
    if email is None:
        raise credentials_exception
    
    return email

@app.middleware("http")
async def auth_middleware(request: Request, call_next):
    # Only apply auth to /api/user routes
    if request.url.path.startswith("/api/user"):
        # Skip auth for OPTIONS requests
        if request.method == "OPTIONS":
            return await call_next(request)
        
        # Check for Authorization header
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return JSONResponse(
                status_code=401,
                content={"detail": "Missing or invalid authorization header"}
            )
        
        token = auth_header.split(" ")[1]
        email = verify_token(token)
        if email is None:
            return JSONResponse(
                status_code=401,
                content={"detail": "Invalid token"}
            )
        
        # Add user email to request state for use in routes
        request.state.current_user = email
    
    return await call_next(request)

app.include_router(user.router, prefix="/api/user")

@app.get("/")
async def root():
    return {"message": "LegalAI Backend API"}

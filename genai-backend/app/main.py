from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import connect_to_mongo, close_mongo_connection
from app.routers import auth,user
from contextlib import asynccontextmanager
@asynccontextmanager
async def lifespan(app:FastAPI):
    await connect_to_mongo()
    yield
    await close_mongo_connection()
    
app = FastAPI(title="LegalAI Backend", version="1.0.0",lifespan=lifespan)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api")

app.add_middleware(
    
)
# user routes
app.include_router(user.router,prefix="/api")

@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "LegalAI Backend API"}

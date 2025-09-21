import os
from passlib.context import CryptContext
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import PyMongoError
from dotenv import load_dotenv
from app.models import UserCreate, UserInDB

load_dotenv()

# --- MongoDB Setup ---
client: AsyncIOMotorClient 
db = None
db_name= None
users_collection = None  

# --- Password Hashing ---
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# --- Connection Management ---
async def connect_to_mongo():
    global client, db, users_collection
    mongodb_url = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
    client = AsyncIOMotorClient(mongodb_url)
    db_name = os.getenv("DB_NAME", "legalai")
    db = client[db_name]
    users_collection = db["users"]

async def close_mongo_connection():
    global client
    if client:
        client.close()

# --- Utility functions ---
def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


# --- Database operations ---
async def create_user(user_data: UserCreate):
    """Insert a new user into MongoDB"""
    try:
        if not users_collection:
            raise RuntimeError("MongoDB not connected")

        existing = await users_collection.find_one({"email": user_data.email})
        if existing:
            return None  # email already registered

        user_in_db = UserInDB(
            **user_data.dict(),
            hashed_password=hash_password(user_data.password),
        )

        await users_collection.insert_one(user_in_db.dict(by_alias=True))
        return user_in_db

    except PyMongoError as e:
        raise RuntimeError(f"Database error while creating user: {e}")


async def get_user_by_email(email: str):
    """Fetch a user by email"""
    try:
        if not users_collection:
            raise RuntimeError("MongoDB not connected")

        return await users_collection.find_one({"email": email})
    except PyMongoError as e:
        raise RuntimeError(f"Database error while fetching user: {e}")

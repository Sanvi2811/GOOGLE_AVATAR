# GenAI Backend

A FastAPI backend for legal document processing with AI summarization.

## Features

- User authentication with JWT tokens
- Protected file upload/download endpoints
- PDF and image text extraction
- AI-powered document summarization using Google Gemini
- MongoDB integration

## Environment Variables

Create a `.env` file with the following variables:

```env
# Database Configuration
MONGODB_URL=mongodb://localhost:27017
DB_NAME=legalai

# JWT Configuration
SECRET_KEY=your-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Gemini API Configuration
GEMINI_API_KEY=your-gemini-api-key
# Alternative name for the API key
GOOGLE_API_KEY=your-gemini-api-key
```

## Installation

1. Install dependencies:
```bash
uv sync
```

2. Set up environment variables (copy `.env.example` to `.env` and fill in values)

3. Start the server:
```bash
uv run python run.py
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create a new user account
- `POST /api/auth/login` - Login and get JWT token

### User Routes (Protected - requires authentication)
- `POST /api/user/upload/` - Upload and process documents
- `GET /api/user/download/{filename}` - Download processed documents

## Authentication

All `/api/user/*` routes require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Recent Changes

- Removed all `settings` usage in favor of environment variables
- Added authentication middleware for user routes
- Fixed user router structure (was incorrectly using FastAPI app instead of APIRouter)
- Added proper error handling and validation
- Created comprehensive environment variable configuration

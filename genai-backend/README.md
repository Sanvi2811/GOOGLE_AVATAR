# LegalAI Backend

A FastAPI backend for the LegalAI application with MongoDB integration and Google OAuth support.

## Features

- User authentication with JWT tokens
- Google OAuth integration
- MongoDB database integration
- Password hashing with bcrypt
- CORS support for frontend integration

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start MongoDB (make sure MongoDB is running on your system)

4. Run the application:
```bash
python run.py
```

## Environment Variables

- `MONGODB_URL`: MongoDB connection string
- `DATABASE_NAME`: Database name
- `SECRET_KEY`: JWT secret key
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
- `ALLOWED_ORIGINS`: CORS allowed origins

## API Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/google` - Google OAuth login
- `GET /api/auth/me` - Get current user info

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add your domain to authorized origins
6. Copy Client ID and Client Secret to your .env file

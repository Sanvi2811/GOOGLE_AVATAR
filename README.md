# LegalAI - Full Stack Application

A modern legal AI application with React frontend and FastAPI backend, featuring user authentication with Google OAuth and MongoDB integration.

## �� Features

### Frontend (React + TypeScript + Vite)
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- **State Management**: Zustand for clean, simple state management
- **Authentication**: Google OAuth integration with @react-oauth/google
- **Responsive Design**: Mobile-first responsive design
- **Routing**: React Router for navigation
- **Animations**: Framer Motion for smooth animations

### Backend (FastAPI + Python)
- **RESTful API**: FastAPI with automatic OpenAPI documentation
- **Authentication**: JWT-based authentication with Google OAuth support
- **Database**: MongoDB integration with Motor (async MongoDB driver)
- **Security**: Password hashing with bcrypt, CORS support
- **Validation**: Pydantic models for request/response validation

## 🛠️ Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- React Router
- Framer Motion
- @react-oauth/google
- Lucide React (icons)

### Backend
- FastAPI
- Python 3.13
- MongoDB
- Motor (async MongoDB driver)
- JWT (python-jose)
- Google Auth
- Pydantic
- Uvicorn

## 📁 Project Structure

```
genai/
├── genai-frontend/          # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── stores/         # Zustand stores
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── package.json
├── genai-backend/          # FastAPI backend
│   ├── app/
│   │   ├── core/           # Core configuration
│   │   ├── models/         # Pydantic models
│   │   ├── routers/        # API routes
│   │   └── services/       # Business logic
│   ├── requirements.txt
│   └── run.py
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- MongoDB (local or cloud)

### 1. Clone and Setup

```bash
git clone <repository-url>
cd genai
```

### 2. Backend Setup

```bash
cd genai-backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start MongoDB (if running locally)
# Make sure MongoDB is running on localhost:27017

# Run the backend
python run.py
```

The backend will be available at `http://localhost:8000`

### 3. Frontend Setup

```bash
cd genai-frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 🔧 Configuration

### Backend Environment Variables (.env)

```env
# Database
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=legalai

# JWT
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:8000/auth/google/callback

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### Frontend Environment Variables (.env)

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
```

## 🔐 Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials and create OAuth 2.0 Client ID
5. Add authorized origins:
   - `http://localhost:3000`
   - `http://localhost:5173`
   - Your production domain
6. Copy Client ID and Client Secret to your environment files

## 📚 API Documentation

Once the backend is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Available Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/google` - Google OAuth login
- `GET /api/auth/me` - Get current user info

## 🏗️ Development

### Backend Development

```bash
cd genai-backend
source venv/bin/activate
python run.py
```

### Frontend Development

```bash
cd genai-frontend
npm run dev
```

### Building for Production

#### Frontend
```bash
cd genai-frontend
npm run build
```

#### Backend
```bash
cd genai-backend
pip install -r requirements.txt
python run.py
```

## 🧪 Testing

### Frontend Testing
```bash
cd genai-frontend
npm run test
```

### Backend Testing
```bash
cd genai-backend
source venv/bin/activate
pytest
```

## �� Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Set environment variables in your hosting service

### Backend (Railway/Heroku/DigitalOcean)
1. Deploy the backend code
2. Set environment variables
3. Ensure MongoDB is accessible
4. Update CORS settings for production domain

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information

## 🔄 Recent Changes

- ✅ Removed React Context in favor of Zustand
- ✅ Added Google OAuth integration
- ✅ Implemented FastAPI backend with MongoDB
- ✅ Added JWT authentication
- ✅ Created responsive UI components
- ✅ Added password validation
- ✅ Implemented error handling

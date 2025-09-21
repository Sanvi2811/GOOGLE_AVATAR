# LegalAI - Legal Document Analysis Platform

A comprehensive AI-powered platform that simplifies complex legal documents into clear, accessible guidance, empowering users to make informed decisions.

## Features

### �� Core Functionality
- **Document Upload**: Support for PDF, DOC, DOCX, and image files
- **OCR Processing**: Automatic text extraction from scanned documents
- **AI Analysis**: Powered by Google Cloud's Gemini LLM for document analysis
- **Plain Language Summaries**: Convert legal jargon into understandable terms
- **Risk Assessment**: Identify potential risks and unfavorable terms
- **Personalized Recommendations**: AI-powered suggestions for contract improvements

### 🤖 AI Legal Assistant
- **Interactive Chat**: Real-time conversation with AI legal bot
- **Document-Specific Advice**: Context-aware responses based on uploaded documents
- **Term Explanations**: Detailed explanations of complex legal concepts
- **Risk Alerts**: Proactive identification of concerning clauses

### 👨‍💼 Lawyer Network
- **Local Recommendations**: City-based lawyer suggestions
- **Specialty Matching**: Connect with lawyers based on document type
- **Contact Integration**: Direct communication with recommended lawyers
- **Rating System**: User reviews and ratings for transparency

### 📊 Dashboard Features
- **Document History**: Track all analyzed documents
- **Progress Monitoring**: Real-time processing status
- **Download Reports**: Export analysis results as PDF
- **Risk Visualization**: Clear risk level indicators

## Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Backend API running on localhost:8080

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd legal-ai-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── DocumentUpload.tsx
│   ├── ChatInterface.tsx
│   ├── HistoryTab.tsx
│   └── LawyerRecommendations.tsx
├── pages/              # Page components
│   ├── LandingPage.tsx
│   ├── LoginPage.tsx
│   ├── SignupPage.tsx
│   └── Dashboard.tsx
├── contexts/           # React contexts
│   └── AuthContext.tsx
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   └── api.ts
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## API Integration

The frontend is designed to work with a backend API running on `localhost:8080`. The API endpoints include:

- **Authentication**: `/api/auth/*`
- **Document Management**: `/api/documents/*`
- **Chat Interface**: `/api/chat/*`
- **Lawyer Network**: `/api/lawyers/*`
- **Analysis Services**: `/api/analysis/*`

## Features in Detail

### Document Upload & Processing
- Drag-and-drop file upload interface
- Support for multiple file formats
- Real-time upload progress
- OCR text extraction
- AI-powered document analysis

### AI Legal Assistant
- Context-aware responses
- Document-specific advice
- Risk identification and alerts
- Plain language explanations
- Interactive chat interface

### Risk Assessment
- Automated risk scoring
- Detailed risk factor analysis
- Visual risk indicators
- Improvement recommendations
- Contract comparison tools

### Lawyer Recommendations
- Location-based filtering
- Specialty matching
- Contact information
- Rating and review system
- Direct communication channels

## Customization

### Theming
The application supports light and dark themes with customizable color schemes. Modify the Tailwind configuration to adjust colors and styling.

### API Configuration
Update the `API_BASE_URL` in `src/utils/api.ts` to point to your backend server.

### Feature Flags
Enable or disable features by modifying the component imports and routing in `App.tsx`.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please contact the development team or create an issue in the repository.

---

**LegalAI** - Making legal documents accessible to everyone.

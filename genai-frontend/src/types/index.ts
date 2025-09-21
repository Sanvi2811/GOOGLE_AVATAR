export interface User {
  id: string
  email: string
  name: string
}

export interface Document {
  id: string
  name: string
  type: string
  size: number
  url: string
  uploadDate: Date
  status: 'uploading' | 'processing' | 'completed' | 'failed'
}

export interface AnalysisResult {
  summary: string
  riskLevel: number
  keyPoints: string[]
  concerns: string[]
  recommendations: string[]
  contractType: string
  parties: string[]
  importantDates: string[]
  financialTerms: {
    amount?: number
    currency?: string
    paymentSchedule?: string
  }
}

export interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  type?: 'text' | 'analysis' | 'warning' | 'success'
}

export interface Lawyer {
  id: string
  name: string
  firm: string
  location: string
  phone: string
  email?: string
  rating: number
  specialties: string[]
  experience: string
  consultationFee: string
  availability: string
  languages: string[]
}

export interface ChatSession {
  id: string
  documentId?: string
  messages: Message[]
  createdAt: Date
  updatedAt: Date
}

export interface DocumentHistory {
  id: string
  name: string
  type: string
  uploadDate: Date
  status: 'completed' | 'processing' | 'failed'
  riskLevel: number
  summary: string
  analysisResult?: AnalysisResult
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface UploadProgress {
  fileId: string
  progress: number
  status: 'uploading' | 'processing' | 'completed' | 'failed'
}

export interface RiskAssessment {
  overallRisk: number
  riskFactors: {
    factor: string
    severity: 'low' | 'medium' | 'high'
    description: string
    recommendation: string
  }[]
  confidence: number
}

export interface ContractComparison {
  original: string
  suggested: string
  changes: {
    type: 'addition' | 'modification' | 'removal'
    section: string
    originalText: string
    suggestedText: string
    reason: string
  }[]
}

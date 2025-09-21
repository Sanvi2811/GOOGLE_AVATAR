export interface User {
  id: string
  email: string
  name: string
  created_at: string
  updated_at: string
}

export interface DocumentUpload {
  file: File
  name: string
  type: string
  size: number
}

export interface AnalysisResult {
  summary: string
  download_link: string
}

export interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export interface DocumentHistory {
  id: string
  name: string
  type: string
  size: number
  uploadedAt: Date
  summary?: string
  downloadLink?: string
}

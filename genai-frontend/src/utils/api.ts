import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  signup: (name: string, email: string, password: string) =>
    api.post('/auth/signup', { name, email, password }),
  
  logout: () => api.post('/auth/logout'),
  
  refreshToken: () => api.post('/auth/refresh'),
}

export const documentAPI = {
  upload: (formData: FormData) =>
    api.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  
  analyze: (documentId: string) =>
    api.post(`/documents/${documentId}/analyze`),
  
  getAnalysis: (documentId: string) =>
    api.get(`/documents/${documentId}/analysis`),
  
  getHistory: () => api.get('/documents/history'),
  
  delete: (documentId: string) =>
    api.delete(`/documents/${documentId}`),
  
  download: (documentId: string) =>
    api.get(`/documents/${documentId}/download`, {
      responseType: 'blob',
    }),
}

export const chatAPI = {
  sendMessage: (message: string, documentId?: string) =>
    api.post('/chat/message', { message, documentId }),
  
  getChatHistory: (sessionId?: string) =>
    api.get('/chat/history', { params: { sessionId } }),
  
  createSession: (documentId?: string) =>
    api.post('/chat/session', { documentId }),
}

export const lawyerAPI = {
  getRecommendations: (location?: string, specialty?: string) =>
    api.get('/lawyers/recommendations', {
      params: { location, specialty },
    }),
  
  getLawyerDetails: (lawyerId: string) =>
    api.get(`/lawyers/${lawyerId}`),
  
  contactLawyer: (lawyerId: string, message: string) =>
    api.post(`/lawyers/${lawyerId}/contact`, { message }),
}

export const analysisAPI = {
  getRiskAssessment: (documentId: string) =>
    api.get(`/analysis/${documentId}/risk`),
  
  getContractComparison: (documentId: string, suggestedChanges: any) =>
    api.post(`/analysis/${documentId}/compare`, { suggestedChanges }),
  
  generateReport: (documentId: string) =>
    api.post(`/analysis/${documentId}/report`),
}

export default api

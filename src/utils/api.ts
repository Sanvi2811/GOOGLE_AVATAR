const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

// Helper function to get auth token
const getAuthToken = () => localStorage.getItem('authToken')

// Helper function to make authenticated requests
const makeAuthenticatedRequest = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken()
  if (!token) {
    throw new Error('No authentication token found')
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  })

  if (response.status === 401) {
    localStorage.removeItem('authToken')
    window.location.href = '/login'
    throw new Error('Authentication required')
  }

  return response
}

export const documentAPI = {
  upload: async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await makeAuthenticatedRequest('/api/user/upload/', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail || 'Upload failed')
    }

    return response.json()
  },

  download: async (filename: string) => {
    const response = await makeAuthenticatedRequest(`/api/user/download/${filename}`)
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail || 'Download failed')
    }

    return response.blob()
  },
}

export default { documentAPI }

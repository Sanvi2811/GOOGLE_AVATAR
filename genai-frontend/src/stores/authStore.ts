import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  googleLogin: (googleToken: string) => Promise<void>
  logout: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
}

type AuthStore = AuthState & AuthActions

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // State
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      // Actions
      login: async (email: string, password: string) => {
        set({ loading: true, error: null })
        try {
          const formData = new FormData()
          formData.append('username', email)
          formData.append('password', password)

          const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            body: formData,
          })

          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.detail || 'Login failed')
          }

          const data = await response.json()
          
          // Get user info
          const userResponse = await fetch(`${API_BASE_URL}/api/auth/me`, {
            headers: {
              'Authorization': `Bearer ${data.access_token}`,
            },
          })

          if (userResponse.ok) {
            const userData = await userResponse.json()
            set({
              user: userData,
              isAuthenticated: true,
              loading: false,
              error: null,
            })
          } else {
            throw new Error('Failed to get user info')
          }
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Login failed',
            loading: false,
          })
          throw error
        }
      },

      signup: async (name: string, email: string, password: string) => {
        set({ loading: true, error: null })
        try {
          const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
          })

          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.detail || 'Signup failed')
          }

          const data = await response.json()
          set({
            user: data,
            isAuthenticated: true,
            loading: false,
            error: null,
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Signup failed',
            loading: false,
          })
          throw error
        }
      },

      googleLogin: async (googleToken: string) => {
        set({ loading: true, error: null })
        try {
          const response = await fetch(`${API_BASE_URL}/api/auth/google`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: googleToken }),
          })

          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.detail || 'Google login failed')
          }

          const data = await response.json()
          
          // Get user info
          const userResponse = await fetch(`${API_BASE_URL}/api/auth/me`, {
            headers: {
              'Authorization': `Bearer ${data.access_token}`,
            },
          })

          if (userResponse.ok) {
            const userData = await userResponse.json()
            set({
              user: userData,
              isAuthenticated: true,
              loading: false,
              error: null,
            })
          } else {
            throw new Error('Failed to get user info')
          }
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Google login failed',
            loading: false,
          })
          throw error
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          loading: false,
          error: null,
        })
      },

      setLoading: (loading: boolean) => set({ loading }),
      setError: (error: string | null) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

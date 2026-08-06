import api from './api'
import { tokenStorage } from './tokenStorage'

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials)
    tokenStorage.set(response.data.data.accessToken)
    return response.data
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  refresh: async () => {
    const response = await api.post('/auth/refresh')
    tokenStorage.set(response.data.data.accessToken)
    return response.data
  },

  logout: async () => {
    try {
      await api.post('/auth/logout')
    } finally {
      tokenStorage.clear()
    }
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/current-user')
    return response.data
  },
}

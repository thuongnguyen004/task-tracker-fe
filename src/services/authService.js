import api from './api'

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  refresh: async (refreshToken) => {
    const response = await api.post('/auth/refresh', { refreshToken })
    return response.data
  },

  logout: async (refreshToken) => {
    if (refreshToken) {
      try {
        await api.post('/auth/logout', { refreshToken })
      } catch (err) {
        console.warn('Logout request error:', err)
      }
    }
  },

  getMe: async () => {
    const response = await api.get('/auth/me')
    return response.data
  },
}

import axios from 'axios'
import { tokenStorage } from './tokenStorage'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

const AUTH_FREE_PATHS = ['/auth/login', '/auth/register', '/auth/refresh', '/auth/logout']

api.interceptors.request.use((config) => {
  const token = tokenStorage.get()

  if (token && !AUTH_FREE_PATHS.includes(config.url)) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

let refreshPromise = null

const refreshAccessToken = () => {
  if (!refreshPromise) {
    refreshPromise = api
      .post('/auth/refresh')
      .then((response) => {
        const accessToken = response.data.data.accessToken
        tokenStorage.set(accessToken)
        return accessToken
      })
      .finally(() => {
        refreshPromise = null
      })
  }

  return refreshPromise
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config

    if (
      error.response?.status !== 401 ||
      request._retried ||
      AUTH_FREE_PATHS.includes(request.url)
    ) {
      return Promise.reject(error)
    }

    request._retried = true

    try {
      const accessToken = await refreshAccessToken()
      request.headers.Authorization = `Bearer ${accessToken}`
      return api(request)
    } catch (refreshError) {
      tokenStorage.clear()
      return Promise.reject(refreshError)
    }
  },
)

export default api

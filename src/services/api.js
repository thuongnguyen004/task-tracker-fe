import axios from 'axios'
import { tokenStorage } from '@/shared/utils'
import { path } from '@/shared/constants/paths'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',

  headers: { 'Content-Type': 'application/json' },

  withCredentials: true,
})

const NOT_AUTH_PATHS = [
  path.auth.api.login,
  path.auth.api.register,
  path.auth.api.refresh,
  path.auth.api.logout,
]

let refreshPromise = null

const refreshAccessToken = () => {
  if (!refreshPromise) {
    refreshPromise = api
      .post(path.auth.api.refresh)
      .then(({ data }) => {
        const accessToken = data.data.accessToken

        tokenStorage.set(accessToken)

        return accessToken
      })
      .finally(() => {
        refreshPromise = null
      })
  }
  return refreshPromise
}

api.interceptors.request.use((config) => {
  const token = tokenStorage.get()

  if (token && !NOT_AUTH_PATHS.includes(config.url)) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const request = error.config

    if (
      error.response?.status !== 401 ||
      request._retried ||
      NOT_AUTH_PATHS.includes(request.url)
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

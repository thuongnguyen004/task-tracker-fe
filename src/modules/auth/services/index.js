import api from '@/services/api'
import { path } from '@/shared/constants/paths'
import { tokenStorage } from '@/shared/utils'

export const login = async (loginPayload) => {
  const response = await api.post(path.auth.api.login, loginPayload)

  tokenStorage.set(response.data.data.accessToken)

  return response.data
}

export const register = async (registerPayload) => {
  const response = await api.post(path.auth.api.register, registerPayload)

  return response.data
}

export const refresh = async () => {
  const response = await api.post(path.auth.api.refresh)

  tokenStorage.set(response.data.data.accessToken)

  return response.data
}

export const logout = async () => {
  try {
    await api.post(path.auth.api.logout)
  } finally {
    tokenStorage.clear()
  }
}

export const getCurrentUser = async () => {
  const response = await api.get(path.auth.api.currentUser)

  return response.data
}

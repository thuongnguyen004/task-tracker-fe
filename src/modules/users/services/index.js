import api from '@/services/api'
import { path } from '@/shared/constants/path.constant'

export const getAssignees = async () => {
  const response = await api.get(path.user.api.assignees)
  return response.data
}
import { getCurrentUser } from '@/modules/auth/services'

export const getUserProfile = async () => {
  const response = await getCurrentUser()
  return response.data
}

export const updateUserProfile = async (profileData) => {
  return profileData
}

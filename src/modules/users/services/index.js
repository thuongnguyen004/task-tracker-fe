import { getCurrentUser } from '@/modules/auth/services'

export const getUserProfile = async () => {
  const response = await getCurrentUser()
  return response.data
}

export const updateUserProfile = async (profileData) => {
  return profileData
}

import api from '@/services/api'
import { path } from '@/shared/constants/path.constants'

export const getAssignees = async () => {
  const response = await api.get(path.user.api.assignees)
  return response.data
}

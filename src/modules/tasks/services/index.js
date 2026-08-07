import api from '@/services/api'
import { path } from '@/shared/constants/path.constant'

export const updateTicket = async (id, payload) => {
  const response = await api.put(path.task.api.update(id), payload)
  return response.data
}

export const getTicketPriorities = async () => {
  const response = await api.get(path.task.api.ticketPriorities)
  return response.data
}

export const getTicketStatuses = async () => {
  const response = await api.get(path.task.api.ticketStatuses)
  return response.data
}

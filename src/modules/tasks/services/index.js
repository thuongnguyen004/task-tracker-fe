import api from '@/services/api'

export const createTicket = (request) => {
  return api.post('/tickets', request)
}

export const getTicketPriorities = () => {
  return api.get('/ticket-priorities')
}

export const getTicketStatuses = () => {
  return api.get('/ticket-statuses')
}

export const getAssignees = () => {
  return api.get('/assignees')
}

import api from '@/services/api'
import { path } from '@/shared/constants/paths'

export const createTicket = async (payload) => {
  const response = await api.post(path.task.api.create, payload)

  return response.data
}

export const updateTicket = async (id, payload) => {
  const response = await api.put(path.task.api.update(id), payload)

  return response.data
}

export const changeStatusTicket = async (ticketId, statusId) => {
  await api.patch(path.task.api.changeStatus(ticketId, statusId))

  return
}

export const getTicketById = async (id) => {
  const response = await api.get(path.task.api.listById(id))

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

const COLUMNS = [
  { id: 'todo', name: 'TO DO', statusId: 1, accentBg: 'bg-status-primary' },
  {
    id: 'in_progress',
    name: 'IN PROGRESS',
    statusId: 2,
    accentBg: 'bg-status-secondary',
  },
  {
    id: 'code_review',
    name: 'CODE REVIEW',
    statusId: 3,
    accentBg: 'bg-status-tertiary',
  },
  {
    id: 'ready_for_qa',
    name: 'READY FOR QA',
    statusId: 4,
    accentBg: 'bg-status-quaternary',
  },
  { id: 'done', name: 'DONE', statusId: 5, accentBg: 'bg-status-quinary' },
]

export const getColumns = () => {
  return COLUMNS
}

export const getTickets = async () => {
  const response = await api.get(path.task.api.list)

  return response.data.data
}

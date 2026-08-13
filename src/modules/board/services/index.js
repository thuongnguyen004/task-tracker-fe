import api from '@/services/api'
import { path } from '@/shared/constants/paths'

const STATUS_ACCENT_STYLES = [
  { accentBg: 'bg-status-primary', columnBg: 'bg-status-primary/10' },
  { accentBg: 'bg-status-secondary', columnBg: 'bg-status-secondary/10' },
  { accentBg: 'bg-status-tertiary', columnBg: 'bg-status-tertiary/10' },
  { accentBg: 'bg-status-quaternary', columnBg: 'bg-status-quaternary/10' },
  { accentBg: 'bg-status-quinary', columnBg: 'bg-status-quinary/10' },
]

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

export const getTicketStatuses = async (page, size) => {
  const response = await api.get(path.task.api.ticketStatuses)

  return response.data
}

export const getTicketActivitiesById = async (id, page, size) => {
  const response = await api.get(path.task.api.activities(id), {
    params: {
      page,
      size,
    },
  })
  return response.data
}
export const getAllTicketArchives = async () => {
  const response = await api.get(path.task.api.archiveList)

  return response.data
}

export const archiveTicketById = async (id) => {
  const response = await api.patch(path.task.api.archivedTicket(id))

  return response.data
}

export const restoreTicketById = async (id) => {
  const response = await api.patch(path.task.api.restoreTicket(id))

  return response.data
}

export const getTicketArchiveById = async (id) => {
  const response = await api.get(path.task.api.archiveById(id))

  return response.data
}

export const getColumns = async () => {
  const response = await getTicketStatuses()
  const statusesList = Array.isArray(response) ? response : response?.data || []

  return statusesList.map((status, index) => {
    const style = STATUS_ACCENT_STYLES[index % STATUS_ACCENT_STYLES.length]
    return {
      id: status.id,
      name: (status.name || '').toUpperCase(),
      accentBg: style.accentBg,
      columnBg: style.columnBg,
    }
  })
}

export const getTickets = async () => {
  const response = await api.get(path.task.api.list)

  return response.data.data
}

export const getComments = async (ticketId) => {
  const response = await api.get(path.task.api.comments(ticketId))

  return response.data
}

export const addComment = async (ticketId, payload) => {
  const response = await api.post(path.task.api.comments(ticketId), payload)

  return response.data
}

export const updateComment = async (ticketId, commentId, payload) => {
  const response = await api.put(path.task.api.commentUpdate(ticketId, commentId), payload)

  return response.data
}

export const deleteComment = async (ticketId, commentId) => {
  const response = await api.delete(path.task.api.commentDelete(ticketId, commentId))

  return response.data
}

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

export const getTicketStatuses = async () => {
  const response = await api.get(path.task.api.ticketStatuses)

  return response.data
}

export const getColumns = async () => {
  const response = await getTicketStatuses()
  const statusesList = Array.isArray(response) ? response : response?.data || []

  return statusesList.map((status, index) => {
    const style = STATUS_ACCENT_STYLES[index % STATUS_ACCENT_STYLES.length]
    return {
      id: status.id,
      rawName: status.name || '',
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

export const getFilteredTickets = async ({ title, priorityIds, assigneeId, unassigned }) => {
  const searchParams = new URLSearchParams()

  if (title) searchParams.append('title', title)
  if (priorityIds?.length) priorityIds.forEach((id) => searchParams.append('priorityIds', id))
  if (assigneeId) searchParams.append('assigneeId', assigneeId)
  if (unassigned) searchParams.append('unassigned', 'true')

  const query = searchParams.toString()
  const response = await api.get(query ? `${path.task.api.list}?${query}` : path.task.api.list)

  return response.data.data
}

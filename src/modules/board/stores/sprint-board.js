import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getColumns, getTickets } from '../services'
import { toast } from 'vue3-toastify'

export const useSprintBoardStore = defineStore('sprintBoard', () => {
  const columns = ref([])
  const tickets = ref([])
  const isLoading = ref(false)

  const fetchBoardData = async () => {
    isLoading.value = true

    try {
      const [colsData, ticketsData] = await Promise.all([getColumns(), getTickets()])

      columns.value = colsData
      tickets.value = ticketsData || []
    } catch (err) {
      const message = err.response?.data?.message || err?.message || 'Failed to load board data'

      toast.error(message)
    } finally {
      isLoading.value = false
    }
  }

  const fetchTicket = async () => {
    try {
      const response = await getTickets()
      tickets.value = response
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  const moveTicketUpdateStatus = (ticketStatus) => {
    tickets.value = tickets.value
      .map((ticket) => (ticket.id === ticketStatus.id ? { ...ticketStatus } : ticket))
      .sort((a, b) => b.updatedAt - a.updatedAt)
  }

  const ticketsByColumn = computed(() => {
    const map = {}

    columns.value.forEach((col) => {
      map[col.id] = tickets.value.filter((t) => {
        if (t.statusId != null) {
          return Number(t.statusId) === Number(col.id)
        }

        if (t.status != null) {
          if (typeof t.status === 'object' && t.status.id != null) {
            return Number(t.status.id) === Number(col.id)
          }

          const ticketStatusStr = String(t.status)
            .toLowerCase()
            .replace(/[\s_-]+/g, '')

          const colNameStr = String(col.name)
            .toLowerCase()
            .replace(/[\s_-]+/g, '')

          return ticketStatusStr === colNameStr
        }

        return false
      })
    })

    return map
  })

  const totalActiveTickets = computed(() => tickets.value.length)

  return {
    columns,
    tickets,
    isLoading,
    ticketsByColumn,
    totalActiveTickets,
    fetchBoardData,
    fetchTicket,
    moveTicketUpdateStatus,
  }
})

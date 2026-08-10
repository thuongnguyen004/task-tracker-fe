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

  const ticketsByColumn = computed(() => {
    const map = {}

    columns.value.forEach((col) => {
      map[col.statusId] = tickets.value.filter((t) => {
        if (t.statusId != null && Number(t.statusId) === Number(col.statusId)) {
          return true
        }

        if (t.status) {
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
  }
})

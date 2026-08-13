import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getColumns, getTickets, getFilteredTickets } from '../services'
import { toast } from 'vue3-toastify'

export const useSprintBoardStore = defineStore('sprintBoard', () => {
  const columns = ref([])
  const tickets = ref([])
  const isLoading = ref(false)

  const search = ref('')
  const selectedPriorityIds = ref([])
  const selectedAssigneeId = ref(null)
  const unassigned = ref(false)

  const priorityAliasMap = {
    1: 'low',
    low: 'low',
    2: 'medium',
    medium: 'medium',
    3: 'high',
    high: 'high',
    4: 'critical',
    critical: 'critical',
  }

  const filteredTickets = computed(() => {
    return tickets.value.filter((t) => {
      if (search.value && search.value.trim() !== '') {
        const query = search.value.trim().toLowerCase()
        const titleMatch = t.title ? t.title.toLowerCase().includes(query) : false
        const descMatch = t.description ? t.description.toLowerCase().includes(query) : false
        if (!titleMatch && !descMatch) {
          return false
        }
      }

      if (unassigned.value || selectedAssigneeId.value === 'UNASSIGNED') {
        if (t.assigneeId != null || (t.assignee != null && t.assignee !== '')) {
          return false
        }
      } else if (selectedAssigneeId.value !== null && selectedAssigneeId.value !== '') {
        const sel = String(selectedAssigneeId.value)
        const matchId = t.assigneeId != null && String(t.assigneeId) === sel
        const matchObjId =
          t.assignee &&
          typeof t.assignee === 'object' &&
          t.assignee.id != null &&
          String(t.assignee.id) === sel
        const matchObjName =
          t.assignee &&
          typeof t.assignee === 'object' &&
          (t.assignee.name === sel || t.assignee.username === sel)
        const matchStrName =
          t.assignee &&
          typeof t.assignee === 'string' &&
          t.assignee.toLowerCase() === sel.toLowerCase()

        if (!matchId && !matchObjId && !matchObjName && !matchStrName) {
          return false
        }
      }

      if (selectedPriorityIds.value && selectedPriorityIds.value.length > 0) {
        const matchPriority = selectedPriorityIds.value.some((pVal) => {
          if (t.priorityId != null && String(t.priorityId) === String(pVal)) return true
          if (t.priority != null) {
            const tP = String(t.priority).toLowerCase()
            const selP = String(pVal).toLowerCase()
            if (tP === selP) return true
            if (
              priorityAliasMap[tP] === priorityAliasMap[selP] &&
              priorityAliasMap[tP] !== undefined
            )
              return true
          }
          return false
        })
        if (!matchPriority) {
          return false
        }
      }

      return true
    })
  })

  const hasActiveFilters = computed(() =>
    Boolean(
      (search.value && search.value.trim() !== '') ||
      (selectedPriorityIds.value && selectedPriorityIds.value.length > 0) ||
      (selectedAssigneeId.value !== null && selectedAssigneeId.value !== '') ||
      unassigned.value,
    ),
  )

  const activeFiltersCount = computed(() => {
    let count = 0
    if (search.value && search.value.trim() !== '') count++
    if (selectedPriorityIds.value && selectedPriorityIds.value.length > 0)
      count += selectedPriorityIds.value.length
    if (selectedAssigneeId.value !== null && selectedAssigneeId.value !== '') count++
    if (unassigned.value && selectedAssigneeId.value !== 'UNASSIGNED') count++
    return count
  })

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

  const applyFilters = async () => {}

  const clearFilters = () => {
    selectedPriorityIds.value = []
    selectedAssigneeId.value = null
    unassigned.value = false
  }

  const clearAllFilter = () => {
    search.value = ''
    selectedPriorityIds.value = []
    selectedAssigneeId.value = null
    unassigned.value = false
  }

  const ticketsByColumn = computed(() => {
    const map = {}

    columns.value.forEach((col) => {
      map[col.id] = filteredTickets.value.filter((t) => {
        if (t.statusId != null && Number(t.statusId) === Number(col.id)) {
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

  const totalActiveTickets = computed(() => filteredTickets.value.length)

  return {
    columns,
    tickets,
    filteredTickets,
    isLoading,
    ticketsByColumn,
    totalActiveTickets,
    hasActiveFilters,
    activeFiltersCount,
    fetchBoardData,

    applyFilters,
    clearFilters,
    clearAllFilter,

    search,
    selectedPriorityIds,
    selectedAssigneeId,
    unassigned,
  }
})

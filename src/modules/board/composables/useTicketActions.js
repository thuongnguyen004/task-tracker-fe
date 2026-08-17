import { ref } from 'vue'
import {
  archiveTicketById,
  changeStatusTicket,
  createTicket,
  getAllTicketArchives,
  getTicketById,
  getTicketByCode,
  restoreTicketById,
  updateTicket,
} from '../services'
import { validateCreateTicket, validateEditTicket } from '../validators'
import { useSprintBoardStore } from '../stores'
import { toast } from 'vue3-toastify'
import { useRoute } from 'vue-router'

export const useTicketActions = (modal, fetch, activity) => {
  const loading = ref(false)

  const ticketById = ref(null)

  const archiveTickets = ref([])

  const route = useRoute()

  const boardStore = useSprintBoardStore()

  const handleNewTicket = async () => {
    try {
      loading.value = true
      const result = validateCreateTicket(modal.forms)
      modal.errors.value = result || {}

      if (result) {
        return
      }

      const payload = {
        title: modal.forms.title.trim(),
        description: modal.forms.description.trim(),
        statusId:
          fetch.statuses.value?.find((item) => item.label?.toLowerCase() === 'to do')?.value ||
          null,
        priorityId:
          modal.forms.priorityId ||
          fetch.priorities.value?.find((item) => item.label?.toLowerCase() === 'medium')?.value ||
          null,
        assigneeId: modal.forms.assigneeId || null,
      }
      const response = await createTicket(payload)

      toast.success(response.message || 'Ticket created successfully')

      if (modal && typeof modal.toggleModalTicket === 'function') {
        modal.toggleModalTicket()
      }

      const boardStore = useSprintBoardStore()
      await boardStore.fetchBoardData()
      await activity.getAllTicketActivities()
    } catch (error) {
      console.error(error)

      toast.error(error.response?.data?.message || 'Failed to create ticket')
    } finally {
      loading.value = false
    }
  }

  const handleUpdateTicket = async () => {
    try {
      loading.value = true
      const result = validateEditTicket(modal.forms)
      modal.errors.value = result || {}

      if (result) {
        return
      }

      const payload = {
        title: modal.forms.title.trim(),
        description: modal.forms.description.trim(),
        statusId: modal.forms.statusId,
        priorityId: modal.forms.priorityId,
        assigneeId: modal.forms.assigneeId,
      }
      const normalize = (value) => value ?? ''

      const hasChanges = Object.keys(payload).some((key) => {
        return String(normalize(payload[key])) !== String(normalize(modal.originalForms.value[key]))
      })
      if (!hasChanges) {
        toast.info('No changes detected')
        modal.open.value = false
        return
      }

      const response = await updateTicket(modal.id.value, payload)
      ticketById.value = response.data
      // await getTicket()
      modal.open.value = false
      toast.success(response.message)
      modal.open.value = false
    } catch (error) {
      toast.error(error.response?.data?.message)
    } finally {
      loading.value = false
    }
  }

  const handleChangeStatus = async (ticketId, statusId) => {
    try {
      const response = await changeStatusTicket(ticketId, statusId)
      boardStore.moveTicketUpdateStatus(response.data)
      await activity.getAllTicketActivities();
    } catch (error) {
      await boardStore.fetchTicket()
      toast.error(error.response?.data?.message)
    }
  }

  const getTicketArchives = async () => {
    try {
      const response = await getAllTicketArchives()

      archiveTickets.value = response.data
    } catch (error) {
      console.error(error)
    }
  }

  const getTicketByTicketCode = async () => {
    try {
      const response = await getTicketByCode(route.params.code)

      ticketById.value = response.data
    } catch (error) {
      console.error(error)
    }
  }

  const handleArchiveTicket = async (id) => {
    try {
      await archiveTicketById(id)

      ticketById.value.archived = true
    } catch (error) {
      console.error(error)
    }
  }

  const handleRestoreTicket = async (id) => {
    try {
      await restoreTicketById(id)

      if (ticketById.value?.id === id) {
        ticketById.value.archived = false
      }
    } catch (error) {
      console.error(error)
    }
  }
  return {
    handleNewTicket,
    handleUpdateTicket,
    handleChangeStatus,
    ticketById,
    getTicketByTicketCode,
    loading,
    getTicketArchives,
    archiveTickets,
    handleArchiveTicket,
    handleRestoreTicket,
  }
}

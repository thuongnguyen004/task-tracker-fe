import { ref } from 'vue'
import {
  changeStatusTicket,
  createTicket,
  getAllTicketArchives,
  getTicketArchiveById,
  getTicketById,
  updateTicket,
} from '../services'
import { validateCreateTicket, validateEditTicket } from '../validators'
import { useSprintBoardStore } from '../stores'
import { toast } from 'vue3-toastify'
import { useRoute } from 'vue-router'

export const useTicketActions = (modal, fetch) => {
  const loading = ref(false)

  const ticketById = ref({})

  const archiveTickets = ref({})

  const archiveById = ref({})

  const route = useRoute()

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
      const isEmpty = (value) => value === null || value === undefined || value === ''
      const isSameValue = (a, b) => (isEmpty(a) && isEmpty(b)) || String(a) === String(b)
      const hasChanges = Object.keys(payload).some(
        (key) => !isSameValue(payload[key], modal.originalForms.value[key]),
      )
      if (!hasChanges) {
        toast.info('No changes detected')
        modal.open.value = false
        return
      }
      const response = await updateTicket(modal.id.value, payload)
      await getTicket()
      modal.open.value = false
      toast.success(response.message)
    } catch (error) {
      toast.error(error.response?.data?.message)
    } finally {
      loading.value = false
    }
  }

  const handleChangeStatus = async (ticketId, statusId) => {
    try {
      await changeStatusTicket(ticketId, statusId)
      const boardStore = useSprintBoardStore()
      await boardStore.fetchBoardData()
    } catch (error) {
      const boardStore = useSprintBoardStore()
      await boardStore.fetchBoardData()
      toast.error(error.response?.data?.message)
    }
  }

  const getTicket = async () => {
    try {
      const response = await getTicketById(route.params.id)

      ticketById.value = response.data
    } catch (error) {
      console.error(error)
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

  const getArchiveById = async (id) => {
    try {
      const response = await getTicketArchiveById(id)

      archiveById.value = response.data
    } catch (error) {
      console.error(error)
    }
  }

  return {
    handleNewTicket,
    handleUpdateTicket,
    handleChangeStatus,
    getTicket,
    ticketById,
    loading,
    getTicketArchives,
    archiveTickets,
    getArchiveById,
    archiveById,
  }
}

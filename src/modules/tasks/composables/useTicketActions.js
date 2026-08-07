import { createTicket, updateTicket } from '../services'
import { validateCreateTicket, validateEditTicket } from '../validators'
import { useSprintBoardStore } from '../stores'
import { toast } from 'vue3-toastify'

export const useTicketActions = (modal, fetch) => {
  const handleNewTicket = async () => {
    try {
      const result = validateCreateTicket(modal.forms)
      modal.errors.value = result || {}

      if (result) {
        return
      }

      const payload = {
        title: modal.forms.title,
        description: modal.forms.description,
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
    }
  }

  const handleUpdateTicket = async () => {
    try {
      const result = validateEditTicket(modal.forms)
      modal.errors.value = result || {}

      if (result) {
        return
      }

      const payload = {
        title: modal.forms.title,
        description: modal.forms.description,
        statusId: modal.forms.statusId,
        priorityId: modal.forms.priorityId,
        assigneeId: modal.forms.assigneeId,
      }

      const response = await updateTicket(modal.id.value, payload)

      toast.success(response.message || 'Ticket updated successfully')

      if (modal && typeof modal.toggleModalTicket === 'function') {
        modal.toggleModalTicket()
      }

      const boardStore = useSprintBoardStore()
      await boardStore.fetchBoardData()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update ticket')
    }
  }

  return {
    handleNewTicket,
    handleUpdateTicket,
  }
}

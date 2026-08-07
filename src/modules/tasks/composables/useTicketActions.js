import { ref } from 'vue'
import { createTicket, getTicketById, updateTicket } from '../services'
import { validateCreateTicket, validateEditTicket } from '../validators'
import { toast } from 'vue3-toastify'

export const useTicketActions = (modal, fetch) => {

    const ticketById = ref({})

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
          fetch.statuses.value?.find((item) => item.label?.toLowerCase() === 'to do')?.value ??
          null,
        priorityId:
          fetch.priorities.value?.find((item) => item.label?.toLowerCase() === 'medium')?.value ??
          null,
        assigneeId: modal.forms.assigneeId,
      }
      console.log(fetch)
      console.log(payload)
      const response = await createTicket(payload)
      toast.success(response.message)
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message)
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
      toast.success(response.message)
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  const getTicket = async (id) => {
    try {
      const response = await getTicketById(id)
      ticketById.value = response.data

    } catch (error) {
      console.error(error)
    }
  }

  return {
    handleNewTicket,
    handleUpdateTicket,
    getTicket,
    ticketById,
  }
}

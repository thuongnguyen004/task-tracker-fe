import { updateTicket } from '../services'
import { validateEditTicket } from '../validators'
import { toast } from 'vue3-toastify'

export const useCRUD = (modal) => {
  const editTicket = async () => {
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
  return {
    editTicket,
  }
}

import { reactive, ref } from 'vue'

export const useModal = () => {
  const open = ref(false)
  const id = ref(null)
  const errors = ref({})
  const originalForms = ref(null)
  const forms = reactive({
    title: '',
    description: '',
    priorityId: '',
    statusId: '',
    assigneeId: '',
  })

  const resetForm = () => {
    forms.title = ''
    forms.description = ''
    forms.priorityId = ''
    forms.statusId = ''
    forms.assigneeId = ''
    id.value = null
  }

  const toggleModalTicket = () => {
    resetForm()
    open.value = !open.value
  }

  const openModalEditTicket = (ticket) => {
    id.value = ticket.id
    forms.title = ticket.title
    forms.description = ticket.description
    forms.priorityId = ticket.priorityId
    forms.statusId = ticket.statusId
    forms.assigneeId = ticket.assigneeId ?? ''
    originalForms.value = { ...forms }
    open.value = true
  }

  const clearFieldError = (field) => {
    errors.value[field] = ''
  }
  return {
    open,
    toggleModalTicket,
    openModalEditTicket,
    clearFieldError,
    forms,
    originalForms,
    errors,
    id,
  }
}

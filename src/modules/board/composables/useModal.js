import { reactive, ref } from 'vue'

export const useModal = () => {
  const open = ref(false)
  const id = ref(null)
  const code = ref(null)
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
    code.value = null

    errors.value = {}
  }

  const toggleModalTicket = () => {
    resetForm()
    open.value = !open.value
  }

  const openCreateTicketModal = (statuses, priorities) => {
    toggleModalTicket()

    forms.statusId = statuses.find((item) => item.label === 'To Do')?.value ?? ''

    forms.priorityId = priorities.find((item) => item.label === 'Medium')?.value ?? ''
  }

  const openModalEditTicket = (ticket) => {
    id.value = ticket.id
    code.value = ticket.code
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
    code,
    resetForm,
    openCreateTicketModal,
  }
}

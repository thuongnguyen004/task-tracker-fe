import { reactive, ref } from 'vue'

export const useModal = () => {
  const open = ref(true)

  const forms = reactive({
    title: '',
    description: '',
    priority: '',
    status: '',
    assignee: '',
  })

  const resetForm = () => {
    forms.title = ''
    forms.description = ''
    forms.priority = ''
    forms.status = ''
    forms.assignee = ''
  }

  const toggleModalTicket = () => {
    resetForm()
    open.value = !open.value
  }
  return {
    open,
    toggleModalTicket,
    forms,
  }
}

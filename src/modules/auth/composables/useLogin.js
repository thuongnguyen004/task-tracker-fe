import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/auth/stores'
import { path } from '@/shared/constants/path.constants'

export function useLogin () {
  const router = useRouter()
  const authStore = useAuthStore()
  const loading = ref(false)

  const form = reactive({
    email: '',
    password: '',
  })

  const errors = reactive({
    email: '',
    password: '',
  })

  const validateField = (field) => {
    errors[field] = ''

    if (field === 'email') {
      if (!form.email) {
        errors.email = 'This field is required'
      }
    }

    if (field === 'password') {
      if (!form.password) {
        errors.password = 'This field is required'
      }
    }
  }

  const validateAll = () => {
    validateField('email')
    validateField('password')
    return Object.values(errors).every((e) => !e)
  }

  const handleLogin = async () => {
    if (!validateAll()) return

    loading.value = true
    try {
      await authStore.login({
        email: form.email,
        password: form.password,
      })
      router.push({ name: path.task.board.name })
    } catch {
    } finally {
      loading.value = false
    }
  }

  return {
    form,
    errors,
    loading,
    handleLogin,
    validateField,
    path,
  }
}

import { nextTick, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { path } from '@/shared/constants/path.constants'
import { register } from '../services'

export function useRegister() {
  const router = useRouter()
  const loading = ref(false)

  const form = reactive({
    username: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const errors = reactive({
    username: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  // Format: viết hoa chữ cái đầu
  function formatFullName(value) {
    if (!value) return ''

    // Viết hoa chữ cái đầu của mỗi từ
    return value.replace(
      /(^|\s)(\p{L})/gu,
      (_, separator, character) => separator + character.toLocaleUpperCase('vi-VN')
    )
  }

  // Ngăn space liên tiếp và space ở đầu
  function onFullNameKeydown(event) {
    if (event.key !== ' ') return

    const input = event.target
    const value = input.value
    const cursorPosition = input.selectionStart

    // Không cho space ở đầu
    if (cursorPosition === 0) {
      event.preventDefault()
      return
    }

    // Không cho 2 space liên tiếp
    const charBeforeCursor = value[cursorPosition - 1]
    if (charBeforeCursor === ' ') {
      event.preventDefault()
      return
    }
  }

  // Format và validate fullName khi blur
  function onFullNameBlur() {
    // Xóa space thừa ở cuối (nếu có)
    form.fullName = form.fullName.trimEnd()
    // Format viết hoa chữ cái đầu
    form.fullName = formatFullName(form.fullName)
    // Validate
    validateField('fullName')
  }

  const validateField = (field) => {
    errors[field] = ''

    if (field === 'fullName') {
      if (!form.fullName) {
        errors.fullName = 'This field is required'
      } else if (form.fullName.trim().length < 2 || form.fullName.trim().length > 100) {
        errors.fullName = 'Full name must be between 2 and 100 characters'
      } else if (!/^[a-zA-ZÀ-ỹ\s-]+$/u.test(form.fullName.trim())) {
        errors.fullName = 'Full name can only contain letters, hyphens (-), and spaces'
      }
    }

    if (field === 'username') {
      if (!form.username) {
        errors.username = 'This field is required'
      } else if (form.username.length < 3 || form.username.length > 30) {
        errors.username = 'Username must be between 3 and 30 characters'
      } else if (!/^[a-zA-Z0-9_]+$/.test(form.username)) {
        errors.username = 'Username can only contain letters, numbers, and underscore (_)'
      }
    }

    if (field === 'email') {
      if (!form.email) {
        errors.email = 'This field is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = 'Invalid email address'
      }
    }

    if (field === 'password') {
      if (!form.password) {
        errors.password = 'This field is required'
      } else if (form.password.length < 8) {
        errors.password = 'Password must be at least 8 characters'
      }
    }

    if (field === 'confirmPassword') {
      if (!form.confirmPassword) {
        errors.confirmPassword = 'This field is required'
      } else if (form.password !== form.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match'
      }
    }
  }

  const validateAll = () => {
    validateField('username')
    validateField('fullName')
    validateField('email')
    validateField('password')
    validateField('confirmPassword')

    return Object.values(errors).every((error) => !error)
  }

  const handleRegister = async () => {
    if (!validateAll()) return

    loading.value = true

    try {
      await register({
        username: form.username,
        fullName: form.fullName,
        email: form.email,
        password: form.password,
      })

      toast.success('Account created successfully! Please sign in.')
      router.push({ name: path.auth.login.name })
    } catch (error) {
      const message = error?.response?.data?.message || 'Registration failed'

      toast.error(message)

      if (message.toLowerCase().includes('email')) {
        errors.email = message
      } else if (message.toLowerCase().includes('username')) {
        errors.username = message
      } else if (
        message.toLowerCase().includes('full name') ||
        message.toLowerCase().includes('fullname')
      ) {
        errors.fullName = message
      }
    } finally {
      loading.value = false
    }
  }

  return {
    errors,
    form,
    handleRegister,
    loading,
    onFullNameBlur,
    onFullNameKeydown,
    path,
    validateField,
  }
}

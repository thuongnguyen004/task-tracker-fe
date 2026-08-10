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

  function formatFullName(value) {
    if (!value) return ''

    const sanitized = value.replace(/[^\p{L} -]/gu, '')

    return sanitized.replace(
      /(^|[ -])(\p{L})/gu,
      (_, separator, character) => separator + character.toLocaleUpperCase('vi-VN'),
    )
  }

  function onFullNameInput(event) {
    if (event.isComposing) return

    const input = event.target
    const originalValue = input.value
    const cursorPosition = input.selectionStart ?? originalValue.length
    const formattedValue = formatFullName(originalValue)
    const nextCursorPosition = formatFullName(originalValue.slice(0, cursorPosition)).length

    form.fullName = formattedValue
    validateField('fullName')

    nextTick(() => {
      input.setSelectionRange(nextCursorPosition, nextCursorPosition)
    })
  }

  function onFullNameKeydown(event) {
    if (event.key !== ' ') return

    const input = event.target
    const start = input.selectionStart ?? 0
    const end = input.selectionEnd ?? start
    const before = input.value.slice(0, start)
    const after = input.value.slice(end)

    if (!before || before.endsWith(' ') || after.startsWith(' ')) {
      event.preventDefault()
    }
  }

  function onFullNamePaste(event) {
    event.preventDefault()
    const pastedText = event.clipboardData?.getData('text') ?? ''

    if (/[^\p{L} -]/u.test(pastedText)) {
      errors.fullName = 'Full name can only contain letters and hyphens (-)'
      return
    }

    const input = event.target
    const start = input.selectionStart ?? 0
    const end = input.selectionEnd ?? start
    const before = form.fullName.slice(0, start)
    const after = form.fullName.slice(end)
    const nextValue = formatFullName(before + pastedText + after)
    const nextCursorPosition = formatFullName(before + pastedText).length

    form.fullName = nextValue
    validateField('fullName')

    nextTick(() => {
      input.setSelectionRange(nextCursorPosition, nextCursorPosition)
    })
  }

  const validateField = (field) => {
    errors[field] = ''

    if (field === 'fullName') {
      if (!form.fullName) {
        errors.fullName = 'This field is required'
      } else if (form.fullName.length < 2 || form.fullName.length > 100) {
        errors.fullName = 'Full name must be between 2 and 100 characters'
      } else if (!/^[\p{L} -]+$/u.test(form.fullName)) {
        errors.fullName = 'Full name can only contain letters and hyphens (-)'
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
    onFullNameInput,
    onFullNameKeydown,
    onFullNamePaste,
    path,
    validateField,
  }
}

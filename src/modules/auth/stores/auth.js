import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import * as authService from '../services'
import { tokenStorage } from '@/shared/utils'
import { toast } from 'vue3-toastify'

const EMPTY_USER = {
  id: '',
  username: '',
  email: '',
  createdAt: null,
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref({ ...EMPTY_USER })

  const loading = ref(false)

  const isAuthenticated = computed(() => !!tokenStorage.get())

  const currentUser = computed(() => user.value)

  const login = async (credentials) => {
    loading.value = true

    try {
      const response = await authService.login(credentials)

      await fetchCurrentUser()

      toast.success('Signed in successfully!')

      return response
    } catch (err) {
      const status = err.response?.status
      const message =
        status === 400 || status === 401 || status === 403
          ? 'Email or password is incorrect'
          : err.response?.data?.message || err.message || 'Login failed'

      toast.error(message)

      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchCurrentUser = async () => {
    if (!tokenStorage.get()) {
      user.value = { ...EMPTY_USER }
      return
    }

    try {
      const response = await authService.getCurrentUser()

      if (response && response.data) {
        user.value = response.data
      }
    } catch (err) {
      user.value = { ...EMPTY_USER }

      const message = err.response?.data?.message || 'Failed to fetch current user'

      toast.error(message)
    }
  }

  const logout = async () => {
    try {
      await authService.logout()

      toast.info('Logged out successfully.')
    } catch (err) {
      const message = err.response?.data?.message || 'Logout failed'

      toast.error(message)
    } finally {
      user.value = { ...EMPTY_USER }
    }
  }

  return {
    user,
    loading,
    isAuthenticated,
    currentUser,

    login,
    fetchCurrentUser,
    logout,
  }
})

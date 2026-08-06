import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { authService } from '@/services/authService'
import { tokenStorage } from '@/services/tokenStorage'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(false)

  const isAuthenticated = computed(() => !!tokenStorage.get())
  const currentUser = computed(() => user.value)

  const login = async (credentials) => {
    loading.value = true
    try {
      const response = await authService.login(credentials)
      await fetchCurrentUser()
      return response
    } finally {
      loading.value = false
    }
  }

  const register = async (userData) => {
    loading.value = true
    try {
      const response = await authService.register(userData)
      return response
    } finally {
      loading.value = false
    }
  }

  const fetchCurrentUser = async () => {
    try {
      const response = await authService.getCurrentUser()
      user.value = response.data
    } catch {
      user.value = null
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
    } finally {
      user.value = null
    }
  }

  return {
    user,
    loading,
    isAuthenticated,
    currentUser,
    login,
    register,
    fetchCurrentUser,
    logout,
  }
})

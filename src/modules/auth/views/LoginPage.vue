<template>
  <div class="flex flex-col items-center justify-center">
    <div class="flex flex-col items-center justify-center">
      <div
        class="bg-primary text-secondary mb-5 flex size-12 items-center justify-center rounded-xl text-2xl font-bold"
      >
        T
      </div>
      <span class="text-primary text-2xl font-bold">Welcome back</span>
      <span class="text-tertiary mb-8 font-normal">Sign in to Mini Task Tracker</span>
    </div>

    <div
      class="border-border bg-card flex w-105 flex-col items-center justify-center rounded-xl border px-8 py-10"
    >
      <form class="w-full" @submit.prevent="handleLogin">
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-primary text-sm font-medium">Email</label>
            <input
              v-model="form.email"
              type="text"
              placeholder="john@example.com"
              :disabled="loading"
              class="text-md bg-input w-full rounded-xl border-2 px-3 py-2"
              :class="errors.email ? 'border-red-500' : 'border-border'"
              @blur="validateField('email')"
            />
            <span v-if="errors.email" class="text-xs text-red-500">{{ errors.email }}</span>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-primary text-sm font-medium">Password</label>
            <input
              v-model="form.password"
              type="password"
              placeholder="Enter password"
              :disabled="loading"
              class="text-md bg-input w-full rounded-xl border-2 px-3 py-2"
              :class="errors.password ? 'border-red-500' : 'border-border'"
              @blur="validateField('password')"
            />
            <span v-if="errors.password" class="text-xs text-red-500">{{ errors.password }}</span>
          </div>
        </div>

        <div class="mt-6">
          <button
            type="submit"
            :disabled="loading"
            class="bg-primary text-secondary w-full cursor-pointer rounded-xl py-2 text-sm font-semibold hover:opacity-90 disabled:opacity-50"
          >
            <span v-if="loading">Loading...</span>
            <span v-else>Sign In</span>
          </button>
        </div>
      </form>

      <span class="text-tertiary mt-5 text-sm">
        Don't have an account?
        <RouterLink
          :to="{ name: path.auth.register.name }"
          class="text-primary font-semibold hover:underline"
        >
          Sign up
        </RouterLink>
      </span>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/modules/auth/stores'
import { path } from '@/shared/constants/paths'

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
  } catch (error) {
    const message = error?.response?.data?.message || 'Login failed'
    if (message.toLowerCase().includes('password') || message.toLowerCase().includes('email')) {
      errors.password = message
    }
  } finally {
    loading.value = false
  }
}
</script>

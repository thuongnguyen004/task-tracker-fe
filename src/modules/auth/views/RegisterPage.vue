<template>
  <div class="flex flex-col items-center justify-center">
    <div class="flex flex-col items-center justify-center">
      <div
        class="bg-primary text-secondary mb-5 flex size-12 items-center justify-center rounded-xl text-2xl font-bold"
      >
        T
      </div>
      <span class="text-primary text-2xl font-bold">Create account</span>
      <span class="text-tertiary mb-8 font-normal">Join Mini Task Tracker</span>
    </div>

    <div
      class="border-border bg-card flex w-105 flex-col items-center justify-center rounded-xl border px-8 py-10"
    >
      <form class="w-full" @submit.prevent="handleRegister">
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-primary text-sm font-medium">Username</label>
            <input
              v-model="form.username"
              type="text"
              placeholder="Enter username"
              :disabled="loading"
              class="text-md bg-input w-full rounded-xl border-2 px-3 py-2"
              :class="errors.username ? 'border-red-500' : 'border-border'"
              @input="validateField('username')"
            />
            <span v-if="errors.username" class="text-xs text-red-500">{{ errors.username }}</span>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-primary text-sm font-medium">Full Name</label>
            <input
              v-model="form.fullName"
              type="text"
              placeholder="Enter full name"
              :disabled="loading"
              class="text-md bg-input w-full rounded-xl border-2 px-3 py-2"
              :class="errors.fullName ? 'border-red-500' : 'border-border'"
              @input="onFullNameInput"
              @paste="onFullNamePaste"
              @blur="validateField('fullName')"
            />
            <span v-if="errors.fullName" class="text-xs text-red-500">{{ errors.fullName }}</span>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-primary text-sm font-medium">Email</label>
            <input
              v-model="form.email"
              type="text"
              placeholder="Enter email"
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
              placeholder="Min 8 characters"
              :disabled="loading"
              class="text-md bg-input w-full rounded-xl border-2 px-3 py-2"
              :class="errors.password ? 'border-red-500' : 'border-border'"
              @blur="validateField('password')"
            />
            <span v-if="errors.password" class="text-xs text-red-500">{{ errors.password }}</span>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-primary text-sm font-medium">Confirm Password</label>
            <input
              v-model="form.confirmPassword"
              type="password"
              placeholder="Re-enter password"
              :disabled="loading"
              class="text-md bg-input w-full rounded-xl border-2 px-3 py-2"
              :class="errors.confirmPassword ? 'border-red-500' : 'border-border'"
              @blur="validateField('confirmPassword')"
            />
            <span v-if="errors.confirmPassword" class="text-xs text-red-500">{{
              errors.confirmPassword
            }}</span>
          </div>
        </div>

        <div class="mt-6">
          <button
            type="submit"
            :disabled="loading"
            class="bg-primary text-secondary w-full cursor-pointer rounded-xl py-2 text-sm font-semibold hover:opacity-90 disabled:opacity-50"
          >
            <span v-if="loading">Loading...</span>
            <span v-else>Create Account</span>
          </button>
        </div>
      </form>

      <span class="text-tertiary mt-5 text-sm">
        Already have an account?
        <RouterLink
          :to="{ name: path.auth.login.name }"
          class="text-primary font-semibold hover:underline"
        >
          Sign in
        </RouterLink>
      </span>
    </div>
  </div>
</template>

<script setup>
import { nextTick, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { path } from '@/shared/constants/path.constants'
import { register } from '../services'
import { toast } from 'vue3-toastify'

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

function sanitizeFullName(value) {
  if (!value) return ''

  let cleaned = value.replace(/[^a-zA-Z0-9à-ỹÀ-Ỹ\s\-']/g, '')
  cleaned = cleaned.trim().replace(/\s+/g, ' ')
  cleaned = cleaned.replace(
    /(^|\s)([a-zà-ỹ])/g,
    (_, space, char) => space + char.toLocaleUpperCase('vi-VN')
  )

  return cleaned
}

function onFullNameInput(event) {
  const input = event.target
  const cursorPos = input.selectionStart
  const original = form.fullName
  const sanitized = sanitizeFullName(original)

  if (sanitized !== original) {
    form.fullName = sanitized

    const diff = sanitized.length - original.length
    const newPos = Math.max(0, Math.min(cursorPos + diff, sanitized.length))

    nextTick(() => {
      input.setSelectionRange(newPos, newPos)
    })
  }
}

function onFullNamePaste(event) {
  event.preventDefault()
  const pastedText = (event.clipboardData || window.clipboardData).getData("text")
  const sanitized = sanitizeFullName(pastedText)

  const input = event.target
  const start = input.selectionStart
  const end = input.selectionEnd
  const before = form.fullName.slice(0, start)
  const after = form.fullName.slice(end)

  form.fullName = sanitizeFullName(before + sanitized + after)
}

const validateField = (field) => {
  errors[field] = ''

  if (field === 'fullName') {
    if (!form.fullName) {
      errors.fullName = 'This field is required'
    } else if (form.fullName.length < 2 || form.fullName.length > 100) {
      errors.fullName = 'Full name must be between 2 and 100 characters'
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
  return Object.values(errors).every((e) => !e)
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
    } else if (message.toLowerCase().includes('full name') || message.toLowerCase().includes('fullname')) {
      errors.fullName = message
    }
  } finally {
    loading.value = false
  }
}
</script>

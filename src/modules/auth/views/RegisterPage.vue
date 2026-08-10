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
              @keydown="onFullNameKeydown"
              @input="onFullNameBlur"
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
              @input="validateField('email')"
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
              @input="validateField('password')"
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
              @input="validateField('confirmPassword')"
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
import { useRegister } from '../composables/useRegister'

const {
  errors,
  form,
  handleRegister,
  loading,
  onFullNameBlur,
  onFullNameKeydown,
  path,
  validateField,
} = useRegister()
</script>

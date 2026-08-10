<template>
  <div class="flex justify-center items-center flex-col">
    <div class="flex justify-center items-center flex-col">
      <div
        class="size-12 bg-primary text-2xl text-secondary font-bold rounded-xl flex justify-center items-center mb-5"
      >
        T
      </div>
      <span class="text-2xl font-bold text-primary">Welcome back</span>
      <span class="mb-8 text-tertiary font-normal">Sign in to Mini Task Tracker</span>
    </div>

    <div
      class="w-105 border border-border rounded-xl bg-card flex justify-center items-center flex-col px-8 py-10"
    >
      <form class="w-full" @submit.prevent="handleLogin">
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-primary">Email</label>
            <input
              v-model="form.email"
              type="text"
              placeholder="john@example.com"
              :disabled="loading"
              class="py-2 px-3 rounded-xl border-2 text-md bg-input w-full"
              :class="errors.email ? 'border-red-500' : 'border-border'"
              @input="validateField('email')"
            />
            <span v-if="errors.email" class="text-red-500 text-xs">{{ errors.email }}</span>
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-primary">Password</label>
            <input
              v-model="form.password"
              type="password"
              placeholder="Enter password"
              :disabled="loading"
              class="py-2 px-3 rounded-xl border-2 text-md bg-input w-full"
              :class="errors.password ? 'border-red-500' : 'border-border'"
              @input="validateField('password')"
            />
            <span v-if="errors.password" class="text-red-500 text-xs">{{ errors.password }}</span>
          </div>
        </div>

        <div class="mt-6">
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-2 rounded-xl bg-primary text-secondary font-semibold text-sm hover:opacity-90 disabled:opacity-50 cursor-pointer"
          >
            <span v-if="loading">Loading...</span>
            <span v-else>Sign In</span>
          </button>
        </div>
      </form>

      <span class="mt-5 text-sm text-tertiary">
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
import { useLogin } from '../composables/useLogin'

const {
  form,
  errors,
  loading,
  path,
  handleLogin,
} = useLogin()
</script>

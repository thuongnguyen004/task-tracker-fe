<template>
  <header class="flex items-center justify-between bg-secondary border-b border-border px-6 py-3 shrink-0">
    <div class="flex items-center gap-4">
      <span
        class="bg-primary text-secondary flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold"
      >
        T
      </span>

      <h1 class="text-lg font-bold">Task Tracker</h1>
    </div>

    <div class="flex items-center gap-4">
      <div ref="userMenuRef" class="relative">
        <UserAvatar
          :name="user.fullName"
          @click="handleUserMenuToggle"
          class="border border-transparent transition-all duration-200 hover:cursor-pointer hover:border-gray-300 hover:shadow-sm"
        />

        <UserMenu v-if="isUserMenuOpen" class="absolute top-12 right-0 z-50" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { UserAvatar, UserMenu } from '@/shared/ui/component'
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores'
import { storeToRefs } from 'pinia'

const isUserMenuOpen = ref(false)

const userMenuRef = ref(null)

const route = useRoute()

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const handleUserMenuToggle = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

const handleClickOutside = (event) => {
  if (userMenuRef.value && !userMenuRef.value.contains(event.target)) {
    isUserMenuOpen.value = false
  }
}

watch(
  () => route.fullPath,
  () => {
    isUserMenuOpen.value = false
  },
)

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  authStore.fetchCurrentUser()
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
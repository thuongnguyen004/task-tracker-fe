<template>
  <div class="bg-secondary w-72 rounded-xl p-2 shadow-xl ring-1 ring-black/5">
    <div class="px-3 pt-2">
      <p class="text-tertiary text-xs font-semibold tracking-wide">ACCOUNT</p>

      <div
        class="hover:bg-quinary mt-3 flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-colors"
      >
        <UserAvatar :name="user.fullName" />

        <div class="min-w-0">
          <p class="truncate text-sm font-semibold">{{ user.username }}</p>

          <p class="text-tertiary truncate text-xs">{{ user.email }}</p>
        </div>
      </div>

      <RouterLink
        :to="{ name: path.user.profile.name }"
        class="hover:bg-quinary mt-1 flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition"
      >
        Manage account

        <ExternalLink :size="16" class="text-tertiary" />
      </RouterLink>
    </div>

    <div class="my-2 border-t border-gray-200" />

    <div class="px-3 pb-2">
      <button
        @click="handleLogout"
        class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-500 transition hover:bg-red-50"
      >
        <LogOut :size="18" />

        <span>Log out</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { UserAvatar } from '@/shared/ui/component'
import { path } from '@/shared/constants/path.constants'
import { ExternalLink, LogOut } from '@lucide/vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores'
import { storeToRefs } from 'pinia'

const router = useRouter()

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const handleLogout = async () => {
  await authStore.logout()
  router.push({ name: path.auth.login.name })
}
</script>

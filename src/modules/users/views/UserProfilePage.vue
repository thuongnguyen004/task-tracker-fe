<template>
  <section class="flex flex-col items-center py-8">
    <div class="w-full max-w-md rounded-xl bg-white p-8 shadow">
      <div class="text-center">
        <UserAvatar :name="user.fullName" size="xl" class="mx-auto" />

        <h5 class="mt-4 text-xl font-semibold">{{ user.fullName }}</h5>

        <p class="text-tertiary mt-1 text-sm">Member since {{ formattedDate }}</p>
      </div>

      <UserProfile :user="user" />

      <div class="flex flex-col gap-2">
        <BaseButton variant="quaternary" class="w-full text-xs" @click="handleBackToBoard">
          <ArrowLeft class="h-4 w-4" />

          Back to Board
        </BaseButton>

        <BaseButton variant="tertiary" class="w-full text-xs" @click="handleLogout">
          Logout
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup>
import { BaseButton, UserAvatar } from '@/shared/ui/components'
import { ArrowLeft } from '@lucide/vue'
import { UserProfile } from '../components'
import { useRouter } from 'vue-router'
import { convertDate } from '@/shared/utils'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores'
import { path } from '@/shared/constants/paths'

const router = useRouter()
const authStore = useAuthStore()

const { user } = storeToRefs(authStore)

const formattedDate = computed(() => convertDate(user.value?.createdAt))

onMounted(() => {
  authStore.fetchCurrentUser()
})

const handleBackToBoard = () => {
  router.push({ name: path.task.board.name })
}

const handleLogout = async () => {
  await authStore.logout()
  router.push({ name: path.auth.login.name })
}
</script>

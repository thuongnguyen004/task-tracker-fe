<template>
  <div class="bg-gradient-surface m-auto flex h-screen items-center justify-center px-6">
    <div class="max-w-lg text-center">
      <div
        class="bg-primary/10 text-primary mx-auto flex h-20 w-20 items-center justify-center rounded-2xl"
      >
        <Construction class="h-10 w-10" />
      </div>

      <h1 class="text-primary mt-6 text-3xl font-semibold">This page is under development</h1>

      <p class="text-tertiary mt-3 text-base leading-7">
        We're still working on this page. Some features may not be available yet.
      </p>

      <div class="mt-8 flex justify-center gap-3">
        <div class="w-fit">
          <BaseButton>
            <RouterLink :to="{ name: path.task.board.name }"> Go to sprint board </RouterLink>
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { path } from '@/shared/constants/paths'
import BaseButton from '@/shared/ui/components/BaseButton.vue'
import { Construction } from '@lucide/vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

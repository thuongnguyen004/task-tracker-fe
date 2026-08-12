<template>
  <div>
    <div class="space-y-6">
      <div class="space-y-1">
        <BaseButton
          variant="secondary"
          class="h-10! w-10! rounded-full! p-0!"
          @click="handleBackToBoard"
        >
          <ArrowLeft class="h-4 w-4" />
        </BaseButton>

        <div class="flex gap-4">
          <p class="text-tertiary-light text-sm">TICKET-{{ ticket.id }}</p>

          <PriorityBadge :priority="ticket.priority" class="text-sm!" />
        </div>

        <h2 class="text-primary text-3xl font-bold">{{ ticket.title || '-' }}</h2>

        <div class="text-tertiary-light flex items-center text-sm">
          <span>Created by {{ ticket.createdBy }}</span>

          <span class="bg-quaternary mx-2 h-1 w-1 scale-75 rounded-full"></span>

          <span>Created {{ formatRelativeTime(ticket.createdAt) }}</span>

          <span class="bg-quaternary mx-2 h-1 w-1 scale-75 rounded-full"></span>

          <span>Updated {{ formatRelativeTime(ticket.updatedAt) }}</span>
        </div>
      </div>

      <div class="text-tertiary space-y-2">
        <p class="text-tertiary font-semibold">DESCRIPTION</p>

        <p class="text-sm whitespace-pre-line">
          {{ ticket.description || '-' }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { BaseButton } from '@/shared/ui/components'
import PriorityBadge from './PriorityBadge.vue'
import { formatRelativeTime } from '@/shared/utils'
import { ArrowLeft } from '@lucide/vue'
import { useRouter } from 'vue-router'
import { path } from '@/shared/constants/paths.js'

const router = useRouter()

defineProps({
  ticket: {
    type: Object,
    default: () => ({}),
  },
})

const handleBackToBoard = () => {
  router.push({ name: path.task.board.name })
}
</script>

<template>
  <div>
    <div class="space-y-6">
      <div class="space-y-1">
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

    <h2 class="text-primary text-3xl font-bold">Set up project repository and CI/CD pipeline</h2>

    <div class="text-tertiary flex items-center text-sm">
      <span>Created by Alex Lee</span>

      <span class="bg-quaternary mx-2 h-1 w-1 scale-75 rounded-full"></span>

      <span>2 days ago</span>

      <span class="bg-quaternary mx-2 h-1 w-1 scale-75 rounded-full"></span>

      <span>Updated 3 hours ago</span>
    </div>

    <div class="text-tertiary">
      <p class="text-tertiary font-semibold">DESCRIPTION</p>

      <p class="whitespace-pre-line">
        Initialize the Git repository with proper branching strategy.
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { convertDate } from '@/shared/utils'
import PriorityBadge from './PriorityBadge.vue'
import { formatRelativeTime } from '@/shared/utils/datePrevious.js'

defineProps({
  ticket: {
    type: Object,
    default: () => ({}),
  },
})
</script>

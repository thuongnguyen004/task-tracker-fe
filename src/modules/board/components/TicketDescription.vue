<template>
  <div>
    <div class="space-y-6">
      <BreadCumb />
      <div class="space-y-2">
        <div class="flex gap-4">
          <p class="text-tertiary-light text-sm">{{ ticket.code }}</p>

          <PriorityBadge :priority="ticket.priority" class="text-sm!" />
        </div>

        <h2 class="text-primary text-3xl font-bold wrap-break-word whitespace-pre-line">
          {{ ticket.title || '-' }}
        </h2>

        <div class="text-tertiary-light flex items-center text-sm">
          <span>Created by {{ ticket.createdBy }}</span>

          <span class="bg-quaternary mx-2 h-1 w-1 scale-75 rounded-full"></span>

          <span>Created {{ formatRelativeTime(ticket.createdAt) }}</span>

          <span class="bg-quaternary mx-2 h-1 w-1 scale-75 rounded-full"></span>

          <span>Updated {{ formatRelativeTime(ticket.updatedAt) }}</span>
        </div>
      </div>

      <div class="text-tertiary space-y-2">
        <p class="font-semibold">DESCRIPTION</p>

        <ShowMoreText
          :content="ticket.description || '-'"
          :max-length="1000"
          content-class="text-sm"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import PriorityBadge from './PriorityBadge.vue'
import { formatRelativeTime } from '@/shared/utils'
import ShowMoreText from './ShowMoreText.vue'
import BreadCumb from './Breadcumb.vue'

const props = defineProps({
  ticket: {
    type: Object,
    default: () => ({}),
  },
})
</script>

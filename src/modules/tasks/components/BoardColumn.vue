<template>
  <div class="flex h-full min-w-60 flex-1 flex-col overflow-hidden">
    <div class="my-3 flex shrink-0 items-center gap-2">
      <h2 class="text-xs font-bold tracking-wider text-gray-700 uppercase">
        {{ status.name }}
      </h2>

      <span class="text-tertiary text-xs font-medium">
        {{ tickets.length }}
      </span>
    </div>

    <div class="mb-2 h-1.5 w-full shrink-0 rounded-t-full" :class="status.accentBg" />

    <div class="flex flex-1 flex-col gap-3 overflow-y-auto pr-1">
      <TicketCard v-for="ticket in tickets" :key="ticket.id" :ticket="ticket"
        @select="emit('select-ticket', '027118e8-6b8e-4d9c-9c39-d7981d6a3d95')" />
      <!--hard id, change to ticket.id to forward detail ticket -->
    </div>
  </div>
</template>

<script setup>
import TicketCard from './TicketCard.vue'

defineProps({
  status: {
    type: Object,
    required: true,
  },

  tickets: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['select-ticket'])
</script>

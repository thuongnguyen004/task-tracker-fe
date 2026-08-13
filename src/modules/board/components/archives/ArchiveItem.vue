<template>
  <div
    class="flex cursor-pointer justify-between rounded-xl border border-gray-200 bg-white p-3 shadow-xs transition-shadow hover:shadow-md"
  >
    <div class="flex flex-col gap-3" @click="$emit('open-archive-details', ticket.id)">
      <h3 class="text-primary text-sm font-semibold">{{ ticket.title }}</h3>

      <div class="text-primary flex items-center gap-1.5 text-sm">
        <Archive :size="16" />
        <span>Archived</span>
      </div>
    </div>
    <ArchiveAction @restore-ticket="$emit('restore-ticket', ticket.id)" />
  </div>
</template>

<script setup>
import { Archive } from '@lucide/vue'
import ArchiveAction from './ArchiveAction.vue'

defineProps({
  ticket: {
    type: Object,
    required: true,
  },
})

defineEmits(['open-archive-details', 'restore-ticket'])
</script>

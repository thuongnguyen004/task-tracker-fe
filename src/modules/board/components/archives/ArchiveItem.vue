<template>
  <div class="flex flex-col justify-between gap-3">
    <div>
      <div
        class="flex cursor-pointer flex-col justify-between gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-xs transition-shadow hover:shadow-md"
        @click="$emit('open-archive-details', ticket)"
      >
        <h3 class="text-primary text-sm font-semibold">{{ ticket.title }}</h3>

        <div class="text-primary flex items-center gap-1.5 text-sm">
          <Archive :size="16" />
          <span>Archived</span>
        </div>
      </div>
      <ArchiveAction />
    </div>
  </div>
</template>

<script setup>
import { Archive } from '@lucide/vue'
import ArchiveAction from './ArchiveAction.vue'
import { useTicketActions } from '../../composables/useTicketActions.js'
import { onMounted } from 'vue'

defineProps({
  ticket: {
    type: Object,
    required: true,
  },
})

defineEmits(['open-archive-details'])
</script>

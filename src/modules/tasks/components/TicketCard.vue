<template>
  <div
    class="flex cursor-pointer flex-col justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-xs transition-shadow hover:shadow-md"
    @click="$emit('select', ticket)"
  >
    <h3 class="text-sm leading-snug font-semibold text-gray-800">
      {{ ticket.title }}
    </h3>

    <div class="flex items-center justify-between">
      <PriorityBadge :priority="ticket.priority" />

      <UserAvatar v-if="ticket.assignee" :name="assigneeName" size="sm" />

      <span v-else class="text-quaternary text-xs italic"> Unassigned </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { UserAvatar } from '@/shared/ui/component'
import PriorityBadge from './PriorityBadge.vue'

const props = defineProps({
  ticket: {
    type: Object,
    required: true,
  },
})

defineEmits(['select'])

const assigneeName = computed(() => {
  if (!props.ticket.assignee) return ''

  if (typeof props.ticket.assignee === 'string') {
    return props.ticket.assignee
  }

  return props.ticket.assignee.name || props.ticket.assignee.username || ''
})
</script>

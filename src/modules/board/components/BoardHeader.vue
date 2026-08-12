<template>
  <div class="flex flex-wrap items-center justify-between gap-4 pb-4">
    <div>
      <h1 class="text-primary text-2xl font-bold">Sprint Board</h1>
      <p class="text-tertiary mt-0.5 text-xs">
        {{ totalTickets }} active tickets · {{ totalColumns }} columns
      </p>
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <BoardSearchInput />

      <BaseButton
        variant="primary"
        class="h-9! w-auto! px-3.5 py-0! text-xs font-semibold whitespace-nowrap"
        @click="$emit('open-modal')"
      >
        <Plus class="h-4 w-4" />
        New Ticket
      </BaseButton>

      <BoardFilterButton :assignees="availableAssignees" />

      <BoardMemberAvatars :team-members="teamMembers" :max-avatars="maxAvatars" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Plus } from '@lucide/vue'
import { BaseButton } from '@/shared/ui/components'
import BoardSearchInput from './BoardSearchInput.vue'
import BoardFilterButton from './BoardFilterButton.vue'
import BoardMemberAvatars from './BoardMemberAvatars.vue'

const props = defineProps({
  totalTickets: {
    type: Number,
    default: 0,
  },
  totalColumns: {
    type: Number,
    default: 0,
  },
  teamMembers: {
    type: Array,
    default: () => [
      { name: 'Bun Tran' },
      { name: 'Tinh Tran' },
      { name: 'Thuong Nguyen' },
      { name: 'Bao Mai' },
    ],
  },
  assignees: {
    type: Array,
    default: () => [],
  },
  maxAvatars: {
    type: Number,
    default: 3,
  },
})

defineEmits(['open-modal'])

const availableAssignees = computed(() => {
  if (props.assignees.length > 0) return props.assignees
  return props.teamMembers.map((m) => ({ value: m.name, label: m.name }))
})
</script>

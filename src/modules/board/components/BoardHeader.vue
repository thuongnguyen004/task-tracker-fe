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

      <BoardFilterButton :assignees="assignees.length ? assignees : teamMembers" />

      <BoardMembersAvatarList :members="teamMembers" :max-avatars="maxAvatars" />
    </div>
  </div>
</template>

<script setup>
import { BaseButton } from '@/shared/ui/components'
import { Plus } from '@lucide/vue'
import BoardMembersAvatarList from './members/MembersAvatarList.vue'
import { BoardSearchInput, BoardFilterButton } from './filter'

defineProps({
  totalTickets: {
    type: Number,
  },
  totalColumns: {
    type: Number,
    default: 0,
  },
  teamMembers: {
    type: Array,
    default: () => [],
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

defineEmits(['toggle-filters', 'create-ticket', 'open-modal'])
</script>

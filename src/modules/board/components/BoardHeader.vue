<template>
  <div class="flex flex-wrap items-center justify-between gap-4 pb-4">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Sprint Board</h1>

      <p class="text-tertiary mt-0.5 text-xs">
        {{ totalTickets }} active tickets · {{ totalColumns }} columns
      </p>
    </div>

    <div class="flex items-center gap-3">
      <BaseButton
        variant="primary"
        class="h-9! w-auto! px-3.5 py-0! text-xs font-semibold whitespace-nowrap"
        @click="$emit('open-modal')"
      >
        <Plus class="h-4 w-4" />

        New Ticket
      </BaseButton>

      <BaseButton
        variant="secondary"
        class="h-9! w-auto! px-3.5 py-0! text-xs font-semibold whitespace-nowrap text-gray-700"
        @click="$emit('toggle-filters')"
      >
        <SlidersHorizontal class="h-4 w-4 text-gray-500" />

        Filters
      </BaseButton>

      <BoardMembersAvatarList :members="teamMembers" :max-avatars="maxAvatars" />
    </div>
  </div>
</template>

<script setup>
import { BaseButton } from '@/shared/ui/components'
import { Plus, SlidersHorizontal } from '@lucide/vue'
import BoardMembersAvatarList from './members/MembersAvatarList.vue'

defineProps({
  totalTickets: {
    type: Number,
  },

  totalColumns: {
    type: Number,
    default: 5,
  },

  teamMembers: {
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

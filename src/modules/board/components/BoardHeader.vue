<template>
  <div class="relative">
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

        <div class="flex items-center -space-x-1.5">
          <UserAvatar
            v-for="member in displayedMembers"
            :key="member.name"
            :name="member.name"
            size="sm"
            class="ring-2 ring-white"
          />

          <span
            v-if="remainingCount > 0"
            class="bg-quinary text-tertiary flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ring-2 ring-white select-none"
            :title="`${remainingCount} more members`"
          >
            +{{ remainingCount }}
          </span>
        </div>

        <div ref="userMenuRef" class="relative">
          <BaseButton
            variant="transparent"
            class="h-9! w-auto! text-xs font-semibold whitespace-nowrap text-gray-700"
            @click="handleBoardMenuToggle"
          >
            <Ellipsis />
          </BaseButton>
        </div>
      </div>
      <BoardMenu
        v-if="isBoardMenuOpen"
        class="absolute top-0 right-0 z-50"
        @open-archive="handleArchiveOpen"
        @close-archive-board="handleBoardMenuToggle"
      />

      <ArchiveBoard
        v-if="isArchiveListOpen"
        class="absolute top-0 right-0 z-50"
        @back-menu="handleBackMenu"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { BaseButton, UserAvatar } from '@/shared/ui/components'
import { Ellipsis, Plus, SlidersHorizontal } from '@lucide/vue'
import ArchiveBoard from './archives/ArchiveBoard.vue'
import { useArchiveBoard } from '../composables/index.js'
import { BoardMenu } from './index.js'

const {
  isBoardMenuOpen,
  isArchiveListOpen,
  handleBoardMenuToggle,
  handleArchiveOpen,
  handleBackMenu,
} = useArchiveBoard()

const props = defineProps({
  totalTickets: {
    type: Number,
    default: 12,
  },

  totalColumns: {
    type: Number,
    default: 5,
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

  maxAvatars: {
    type: Number,
    default: 3,
  },
})

defineEmits(['toggle-filters', 'create-ticket', 'open-modal'])

const displayedMembers = computed(() => {
  return props.teamMembers.slice(0, props.maxAvatars)
})

const remainingCount = computed(() => {
  return Math.max(0, props.teamMembers.length - props.maxAvatars)
})
</script>

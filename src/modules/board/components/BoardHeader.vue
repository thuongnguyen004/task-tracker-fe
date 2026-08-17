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

        <BoardMembersAvatarList :members="teamMembers" :max-avatars="maxAvatars" />

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
        @open-global="handleActivityOpen"
        @close-menu-board="handleBoardMenuToggle"
      />

      <TransitionFadeScale
        ><ArchiveBoard
          v-if="isArchiveListOpen"
          class="absolute top-0 right-0 z-50"
          @back-menu="handleBackMenu"
      /></TransitionFadeScale>

      <TransitionFadeScale
        ><ActivityGlobal
          v-if="isActivityListOpen"
          class="absolute top-0 right-0 z-50"
          @back-menu="handleBackMenu"
      /></TransitionFadeScale>
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
import { BaseButton, TransitionFadeScale, UserAvatar } from '@/shared/ui/components'
import { Ellipsis, Plus, SlidersHorizontal } from '@lucide/vue'
import ArchiveBoard from './archives/ArchiveBoard.vue'
import { useArchiveBoard, useGlobalActivityBoard } from '../composables/index.js'
import { ActivityGlobal, BoardMembersAvatarList, BoardMenu } from './index.js'

const isBoardMenuOpen = ref(false)

const archiveBoard = useArchiveBoard(isBoardMenuOpen)
const globalActivity = useGlobalActivityBoard(isBoardMenuOpen)
const { isArchiveListOpen, handleArchiveOpen } = archiveBoard
const { isActivityListOpen, handleActivityOpen } = globalActivity

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

const handleBoardMenuToggle = () => {
  isBoardMenuOpen.value = !isBoardMenuOpen.value

  if (isBoardMenuOpen.value) {
    isArchiveListOpen.value = false
  }
  if (isActivityListOpen.value) {
    isActivityListOpen.value = false
  }
}

const handleBackMenu = () => {
  isBoardMenuOpen.value = true
  if (isArchiveListOpen.value) {
    isArchiveListOpen.value = false
  }
  if (isActivityListOpen.value) {
    isActivityListOpen.value = false
  }
}

const displayedMembers = computed(() => {
  return props.teamMembers.slice(0, props.maxAvatars)
})

const remainingCount = computed(() => {
  return Math.max(0, props.teamMembers.length - props.maxAvatars)
})
</script>

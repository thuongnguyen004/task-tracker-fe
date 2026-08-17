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

        <BoardFilterButton :assignees="assignees.length ? assignees : teamMembers" />

        <BoardSearchInput />

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
        @open-global="handleGlobalActivityOpen"
        @close-menu-board="handleBoardMenuToggle"
      />

      <TransitionFadeScale
        ><ArchiveBoard
          v-if="isArchiveListOpen"
          class="absolute top-0 right-0 z-50"
          @back-menu="handleBackMenu"
          @close-menu="handleArchiveClose"
      /></TransitionFadeScale>

      <TransitionFadeScale
        ><ActivityGlobal
          v-if="isActivityListOpen"
          class="absolute top-0 right-0 z-50"
          @back-menu="handleBackMenu"
          @close-menu="handleActivityClose"
      /></TransitionFadeScale>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { BaseButton, TransitionFadeScale } from '@/shared/ui/components'
import { Ellipsis, Plus } from '@lucide/vue'
import ArchiveBoard from './archives/ArchiveBoard.vue'
import { useArchiveBoard, useGlobalActivityBoard } from '../composables/index.js'
import { ActivityGlobal, BoardMembersAvatarList, BoardMenu } from './index.js'
import BoardFilterButton from './filter/BoardFilterButton.vue'
import BoardSearchInput from './filter/BoardSearchInput.vue'

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

const emit = defineEmits(['toggle-filters', 'create-ticket', 'open-modal', 'load-global-activity'])

const handleGlobalActivityOpen = () => {
  emit('load-global-activity')
  handleActivityOpen()
}

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

const handleArchiveClose = () => {
  isArchiveListOpen.value = false
  isBoardMenuOpen.value = true
}

const handleActivityClose = () => {
  isActivityListOpen.value = false
  isBoardMenuOpen.value = true
}
</script>

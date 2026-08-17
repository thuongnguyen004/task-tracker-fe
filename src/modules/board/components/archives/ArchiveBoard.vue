<template>
  <div>
    <div
      v-if="isArchiveListOpen"
      class="bg-secondary max-h-list flex min-h-0 w-72 flex-col overflow-auto rounded-xl shadow-xl ring-1 ring-black/5"
    >
      <ArchiveHeader @header-action="handleArchiveHeaderAction" />

      <ArchiveList @select="handleSelect" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ArchiveHeader from './ArchiveHeader.vue'
import ArchiveList from './ArchiveList.vue'
import { useArchiveBoard } from '../../composables/useArchiveBoard.js'
const { handleSelect } = useArchiveBoard()

const isArchiveListOpen = ref(true)

const emit = defineEmits(['back-menu'])

const handleArchiveHeaderAction = (action) => {
  if (action === 'back') {
    emit('back-menu')
  }

  if (action === 'close') {
    isArchiveListOpen.value = false
  }
}
</script>

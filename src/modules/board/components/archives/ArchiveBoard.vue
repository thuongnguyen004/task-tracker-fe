<template>
  <div>
    <div
      v-if="isArchiveListOpen"
      class="bg-secondary w-72 rounded-xl shadow-xl ring-1 ring-black/5"
    >
      <ArchiveHeader @header-action="handleArchiveHeaderAction" />

      <ArchiveList @select="handleSelect" />
    </div>

    <ArchiveDetail v-model="isArchiveDetailOpen" :item="selectedArchive" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ArchiveDetail from './ArchiveDetail.vue'
import ArchiveHeader from './ArchiveHeader.vue'
import ArchiveList from './ArchiveList.vue'
import { useArchive } from '../../composables/useArchive.js'

const { isArchiveListOpen, handleSelect, isArchiveDetailOpen, selectedArchive } = useArchive()

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

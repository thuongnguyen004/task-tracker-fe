<template>
  <div>
    <div
      v-if="isArchiveListOpen"
      class="bg-secondary w-72 rounded-xl shadow-xl ring-1 ring-black/5"
    >
      <ArchiveHeader @header-action="handleArchiveHeaderAction" />

      <ArchiveList @select="handleSelect" />
    </div>

    <ArchiveDetail v-model="isArchiveDetailOpen" :item="archiveById" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ArchiveDetail from './ArchiveDetail.vue'
import ArchiveHeader from './ArchiveHeader.vue'
import ArchiveList from './ArchiveList.vue'
import { useTicketActions } from '../../composables/useTicketActions.js'

const isArchiveListOpen = ref(true)
const isArchiveDetailOpen = ref(false)

const { getArchiveById, archiveById } = useTicketActions()

const emit = defineEmits(['back-menu'])

const handleSelect = async (id) => {
  await getArchiveById(id)

  isArchiveListOpen.value = false
  isArchiveDetailOpen.value = true
}

const handleArchiveHeaderAction = (action) => {
  if (action === 'back') {
    emit('back-menu')
  }

  if (action === 'close') {
    isArchiveListOpen.value = false
  }
}
</script>

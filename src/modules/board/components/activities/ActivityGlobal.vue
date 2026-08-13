<template>
  <div>
    <div
      v-if="isArchiveListOpen"
      class="bg-secondary w-lg rounded-xl shadow-xl ring-1 ring-black/5"
    >
      <BoardMenuHeader @header-action="handleArchiveHeaderAction" title="Activity items"/>

      <ActivityGlobalItems />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import BoardMenuHeader from '../BoardMenuHeader.vue'
import { ActivityGlobalItems } from '../index.js'

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

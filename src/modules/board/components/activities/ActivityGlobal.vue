<template>
  <div>
    <div
      v-if="isActivitiesListOpen"
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

const isActivitiesListOpen = ref(true)

const emit = defineEmits(['back-menu', 'close-menu'])

const handleArchiveHeaderAction = (action) => {
  if (action === 'back') {
    emit('back-menu')
  }

  if (action === 'close') {
    isActivitiesListOpen.value = false
    emit('close-menu')
  }
}
</script>

<template>
  <div class="max-h-list overflow-y-auto p-3">
    <ArchiveItem
      v-for="ticket in archiveTickets"
      :key="ticket.id"
      :ticket="ticket"
      @open-archive-details="$emit('select', $event)"
      @restore-ticket="handleRestore"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTicketActions } from '../../composables/useTicketActions.js'
import ArchiveItem from './ArchiveItem.vue'
import { useSprintBoardStore } from '../../stores/sprint-board.js'

const { getTicketArchives, archiveTickets, handleRestoreTicket } = useTicketActions()

const boardStore = useSprintBoardStore()

const emit = defineEmits(['select'])

const handleRestore = async (id) => {
  try {
    await handleRestoreTicket(id)

    await getTicketArchives()

    await boardStore.fetchBoardData()
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getTicketArchives()
})
</script>

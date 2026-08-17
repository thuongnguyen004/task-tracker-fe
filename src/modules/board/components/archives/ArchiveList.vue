<template>
  <div>
    <div class="min-h-0 flex-1 space-y-3 overflow-y-auto p-3" v-if="archiveTickets.length">
      <ArchiveItem
        v-for="ticket in archiveTickets"
        :key="ticket.id"
        :ticket="ticket"
        @open-archive-details="$emit('select', $event)"
        @restore-ticket="handleRestore"
      />
    </div>

    <div class="text-tertiary p-3 text-center" v-else>
      <p>No archived tickets found.</p>
    </div>
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

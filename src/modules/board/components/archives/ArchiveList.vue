<template>
  <div class="p-3">
    <ArchiveItem
      v-for="ticket in archiveTickets"
      :key="ticket.id"
      :ticket="ticket"
      @open-archive-details="$emit('select', $event)"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTicketActions } from '../../composables/useTicketActions.js'
import ArchiveItem from './ArchiveItem.vue'

const { getTicketArchives, archiveTickets } = useTicketActions()

defineEmits(['select'])

onMounted(() => {
  getTicketArchives()
})
</script>

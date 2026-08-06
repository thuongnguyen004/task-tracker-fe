<template>
  <TicketFormModal
    title="Create New Ticket"
    v-model:open="open"
    v-model:forms="forms"
    :statuses="metadataStore.statuses"
    :priorities="metadataStore.priorities"
    :assignees="metadataStore.assignees"
    :errors="errors"
    @close-modal="toggleModalTicket"
    @edit-ticket="editTicket"
    @clear-error="clearFieldError"
  />
</template>

<script setup>
import { onMounted } from 'vue'
import TicketFormModal from '../components/TicketFormModal.vue'
import { useModal } from '../composables/useModal'
import { useTicketMetadataStore } from '../stores/ticketMetadata.js'
import { useCRUD } from '../composables/useCRUD.js'
const metadataStore = useTicketMetadataStore()
const modal = useModal()
const { open, toggleModalTicket, openModalEditTicket, clearFieldError, forms, errors } = modal
const { editTicket } = useCRUD(modal)

onMounted(async () => {
  await metadataStore.fetchStatuses()
  await metadataStore.fetchPriorities()
  await metadataStore.fetchAssignees()
})
</script>

<template>
  <div v-if="loading">Loading...</div>

  <div class="grid grid-cols-[2fr_1fr] gap-6 px-6" v-else-if="ticketById">
    <div>
      <TicketDescription :ticket="ticketById" />
      <TicketTabs />
    </div>

    <TicketSidebar @open-modal="openModalEditTicket" :ticket="ticketById" />
    <TicketFormModal
      title="Edit Ticket"
      buttonTitle="Update Ticket"
      v-model:open="open"
      v-model:forms="forms"
      :statuses="statuses"
      :priorities="priorities"
      :assignees="assignees"
      :errors="errors"
      :loading="loading"
      @close-modal="toggleModalTicket"
      @handle-ticket="handleUpdateTicket"
      @clear-error="clearFieldError"
    />
  </div>

  <div v-else class="text-tertiary">
    <p>Ticket not found.</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { TicketDescription, TicketSidebar, TicketTabs } from '../components/index.js'
import TicketFormModal from '../components/TicketFormModal.vue'
import { useModal, useTicketActions, useTicketMetadata } from '../composables/index.js'

const route = useRoute()

const modal = useModal()

const { open, toggleModalTicket, openModalEditTicket, clearFieldError, forms, errors } = modal

const {
  handleUpdateTicket,
  getTicket,
  ticketById,
  loading,
  handleArchiveTicket,
  handleRestoreTicket,
} = useTicketActions(modal)

const { statuses, priorities, assignees } = useTicketMetadata()

onMounted(() => {
  getTicket(route.params.id)
})
</script>

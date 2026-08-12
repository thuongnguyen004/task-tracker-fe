<template>
  <div class="grid grid-cols-[2fr_1fr] gap-6 px-6">
    <div>
      <TicketDescription :ticket="ticketById" />
      <TicketTabs />
    </div>

    <TicketSidebar
      @open-modal="openModalEditTicket"
      @archive-ticket="handleArchiveTicket"
      @restore-ticket="handleRestoreTicket"
      @delete-ticket="handleDeleteTicket"
      :ticket="ticketById"
    />
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
  getArchiveById,
  handleArchiveTicket,
  handleRestoreTicket,
  handleDeleteTicket,
} = useTicketActions(modal)

const { statuses, priorities, assignees } = useTicketMetadata()

onMounted(() => {
  if (route.query.archived === 'true') {
    getArchiveById(route.params.id)
  } else {
    getTicket(route.params.id)
  }
})
</script>

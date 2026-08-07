<template>
    <TicketFormModal title="Create New Ticket" v-model:open="open" v-model:forms="forms" :statuses="statuses"
        :priorities="priorities" :assignees="assignees" :errors="errors" @close-modal="toggleModalTicket"
        @handle-ticket="handleUpdateTicket" @clear-error="clearFieldError" />
</template>

<script setup>
import TicketFormModal from '../components/TicketFormModal.vue'
import { useModal, useTicketActions, useTicketMetadata } from '../composables'
const modal = useModal()
const { open, toggleModalTicket, openModalEditTicket, clearFieldError, forms, errors } = modal
const { handleUpdateTicket } = useTicketActions(modal)
const { statuses, priorities, assignees } = useTicketMetadata();
</script>

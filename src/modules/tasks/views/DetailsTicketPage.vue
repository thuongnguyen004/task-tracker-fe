<template>
    <TicketFormModal title="Create New Ticket" v-model:open="open" v-model:forms="forms" :statuses="statuses"
        :priorities="priorities" :assignees="assignees" :errors="errors" @close-modal="toggleModalTicket"
        @edit-ticket="editTicket" @clear-error="clearFieldError" />
</template>

<script setup>
import TicketFormModal from '../components/TicketFormModal.vue'
import { useModal } from '../composables/useModal'
import { useCRUD } from '../composables/useCRUD.js'
import { useFetch } from '../composables/useFetch.js'
const modal = useModal()
const { open, toggleModalTicket, openModalEditTicket, clearFieldError, forms, errors } = modal
const { editTicket } = useCRUD(modal)
const { statuses, priorities, assignees } = useFetch();
</script>

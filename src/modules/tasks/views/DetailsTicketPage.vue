<template>
    <div class="grid grid-cols-[2fr_1fr] gap-6 px-6">
        <div>
            <TicketDescription :ticket="ticketById" />
            <TicketTabs />
        </div>

        <TicketSidebar :ticket="ticketById" @open-modal="openModalEditTicket" />
        <TicketFormModal title="Edit Ticket" buttonTitle="Update Ticket" v-model:open="open" v-model:forms="forms"
            :statuses="statuses" :priorities="priorities" :assignees="assignees" :errors="errors"
            @close-modal="closeModalTicket" @handle-ticket="handleUpdateTicket" @clear-error="clearFieldError" />
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { TicketDescription, TicketSidebar, TicketTabs } from '../components/index.js'
import TicketFormModal from '../components/TicketFormModal.vue'
import { useModal, useTicketActions, useTicketMetadata } from '../composables'
const modal = useModal()
const { open, closeModalTicket, openModalEditTicket, clearFieldError, forms, errors } = modal
const { handleUpdateTicket, getTicket, ticketById } = useTicketActions(modal)
const { statuses, priorities, assignees } = useTicketMetadata()

const route = useRoute()

onMounted(() => {
    getTicket(route.params.id)
})
</script>

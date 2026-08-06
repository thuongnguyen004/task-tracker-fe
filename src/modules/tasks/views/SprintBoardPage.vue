<template>
  <TicketFormModal
    title="Create New Ticket"
    v-model:open="open"
    v-model:forms="forms"
    @close-modal="toggleModalTicket"
  />
</template>

<script setup>
import { reactive, ref } from 'vue'
import TicketFormModal from '../components/TicketFormModal.vue'
import { useModal } from '../composables/useModal.js';

const {open, forms, toggleModalTicket} = useModal();
</script>

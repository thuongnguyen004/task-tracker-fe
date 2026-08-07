<template>
    <div class="w-50">
        <BaseButton @click="open = true">
            Create Ticket
        </BaseButton>
    </div>

    <CreateTicketDialog v-model="open" @submit="handleCreateTicket" />
</template>

<script setup>
import { ref } from "vue";

import BaseButton from "@/shared/ui/component/BaseButton.vue";
import CreateTicketDialog from "../components/CreateTicketDialog.vue";
import { createTicket } from "../services/index.js";
import { toast } from "vue3-toastify";

const open = ref(false);

const handleCreateTicket = async (request) => {
    try {
        await createTicket(request);

        open.value = false;
        toast.success("Create ticket successfully");

    } catch (error) {
        console.error(error);
    }
};
</script>
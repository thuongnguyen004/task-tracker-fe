<template>
    <div>
        <div class="space-y-6">
            <div class="space-y-1">
                <div class="flex gap-4">
                    <p class="text-sm text-tertiary-light"> TICKET-{{ ticket.id }}</p>
                    <PriorityBadge :priority="ticket.priority" class="text-sm!" />
                </div>

                <h2 class="text-3xl font-bold text-primary">{{ ticket.title || '-' }}</h2>

                <div class="flex items-center text-sm text-tertiary-light">
                    <span>Created by {{ ticket.createdBy }}</span>

                    <span class="mx-2 h-1 w-1 scale-75 rounded-full bg-quaternary"></span>

                    <span>Created {{ formatRelativeTime(ticket.createdAt) }}</span>

                    <span class="mx-2 h-1 w-1 scale-75 rounded-full bg-quaternary"></span>

                    <span>Updated {{ formatRelativeTime(ticket.updatedAt) }}</span>
                </div>

            </div>

            <div class=" text-tertiary space-y-2">
                <p class="font-semibold text-tertiary">DESCRIPTION</p>

                <p class="whitespace-pre-line text-sm">
                    {{ ticket.description || '-' }}
                </p>
            </div>

        </div>

    </div>
</template>

<script setup>
import { computed } from 'vue'
import { convertDate } from '@/shared/utils'
import PriorityBadge from './PriorityBadge.vue'
import { formatRelativeTime } from '@/shared/utils/datePrevious.js';

defineProps({
    ticket: {
        type: Object,
        default: () => ({}),
    },
})

</script>

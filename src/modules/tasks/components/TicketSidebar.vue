<template>
    <div class="h-fit space-y-6 bg-secondary px-6 py-6">

        <h3 class="text-md font-semibold text-tertiary">DETAILS</h3>

        <div>
            <p class="mb-2 text-sm font-semibold text-tertiary-light">STATUS</p>
            <StatusBadge :status="ticket.status" />
        </div>

        <div>
            <p class="mb-2 text-sm font-semibold text-tertiary-light">PRIORITY</p>
            <PriorityBadge :priority="ticket.priority" class="text-sm!" />
        </div>

        <div>
            <p class="mb-2 text-sm font-semibold text-tertiary-light">
                ASSIGNEE
            </p>

            <div v-if="ticket.assignee" class="flex items-center gap-2 text-sm">
                <UserAvatar :name="ticket.assignee" class="bg-primary!" />
                <span>{{ ticket.assignee }}</span>
            </div>
            <span v-else class="text-sm text-tertiary-light">Unassigned</span>
        </div>

        <div>
            <p class="mb-2 text-sm font-semibold text-tertiary-light">
                CREATED BY
            </p>

            <div class="flex items-center gap-2 text-sm">
                <UserAvatar :name="ticket.createdBy || '-'" class="bg-primary!" />
                <span>{{ ticket.createdBy || '-' }}</span>
            </div>
        </div>

        <div>
            <p class="mb-2 text-sm font-semibold text-tertiary-light">
                CREATED AT
            </p>

            <div class="flex items-center text-sm text-tertiary-light">
                <span>{{ formatDateTime(ticket.createdAt) }}</span>
            </div>
        </div>

        <div>
            <p class="mb-2 text-sm font-semibold text-tertiary-light">
                UPDATED AT
            </p>

            <div class="flex items-center text-sm text-tertiary-light">
                <span>{{ formatDateTime(ticket.updatedAt) }}</span>
            </div>
        </div>

        <div class="w-full border-t border-border"></div>

        <div class="space-y-3">
            <BaseButton @click="emit('open-modal')">
                Edit
            </BaseButton>

            <BaseButton variant="tertiary">
                Archive Ticket
            </BaseButton>
        </div>

    </div>
</template>

<script setup>
import { convertDate, formatDateTime } from '@/shared/utils'
import BaseButton from '@/shared/ui/component/BaseButton.vue';
import PriorityBadge from './PriorityBadge.vue';
import StatusBadge from './StatusBadge.vue';
import UserAvatar from '@/shared/ui/component/UserAvatar.vue';

defineProps({
    ticket: {
        type: Object,
        default: () => ({}),
    },
})

const emit = defineEmits(['open-modal'])
</script>

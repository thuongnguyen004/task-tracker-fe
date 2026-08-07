<template>
    <div class="space-y-6 bg-secondary px-6 py-6 h-screen">

        <h3 class="text-md font-semibold text-tertiary">DETAILS</h3>

        <div>
            <p class="mb-2 text-sm font-semibold text-tertiary">STATUS</p>
            <StatusBadge status="TODO" />
        </div>

        <div>
            <p class="mb-2 text-sm font-semibold text-tertiary">PRIORITY</p>
            <PriorityBadge priority="HIGH" />
        </div>

        <div>
            <p class="mb-2 text-sm font-semibold text-tertiary">
                ASSIGNEE
            </p>

            <div class="flex items-center gap-2 text-sm">
                <Avatar name="Alex Lee" />
                <span>Alex Lee</span>
            </div>
        </div>

        <div>
            <p class="mb-2 text-sm font-semibold text-tertiary">
                CREATED BY
            </p>

            <div class="flex items-center gap-2 text-sm">
                <Avatar name="Alex Lee" />
                <span>Alex Lee</span>
            </div>
        </div>

        <div>
            <p class="mb-2 text-sm font-semibold text-tertiary">
                CREATED AT
            </p>

            <div class="flex items-center text-sm text-tertiary">
                <span>Aug 6, 2026</span>

                <span class="mx-2 h-1 w-1 rounded-full bg-tertiary"></span>

                <span>10:30 AM</span>
            </div>
        </div>

        <div>
            <p class="mb-2 text-sm font-semibold text-tertiary">
                UPDATED AT
            </p>

            <div class="flex items-center text-sm text-tertiary">
                <span>Aug 6, 2026</span>

                <span class="mx-2 h-1 w-1 rounded-full bg-tertiary"></span>

                <span>10:30 AM</span>
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
import PriorityBadge from '@/shared/ui/component/badges/PriorityBadge.vue';
import Avatar from '@/shared/ui/component/Avatar.vue';
import StatusBadge from '@/shared/ui/component/badges/StatusBadge.vue';
import BaseButton from '@/shared/ui/component/BaseButton.vue';

const emit = defineEmits(['open-modal'])
</script>

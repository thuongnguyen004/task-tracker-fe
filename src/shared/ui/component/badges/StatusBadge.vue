<template>
    <span
        class="inline-flex items-center gap-2 rounded-md bg-status-primary px-3 py-1 text-sm font-medium text-primary">
        <span class="h-2 w-2 rounded-full" :class="dotClass"></span>

        {{ label }}
    </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    status: {
        type: String,
        required: true,
    },
})

const statusMap = {
    TODO: {
        label: 'To Do',
        dotClass: 'bg-quaternary',
    },
    IN_PROGRESS: {
        label: 'In Progress',
        dotClass: 'bg-status-secondary',
    },
    CODE_REVIEW: {
        label: 'Code Review',
        dotClass: 'bg-status-tertiary',
    },
    READY_FOR_QA: {
        label: 'Ready for QA',
        dotClass: 'bg-status-quaternary',
    },
    DONE: {
        label: 'Done',
        dotClass: 'bg-priority-primary',
    },
}

const label = computed(() => statusMap[props.status]?.label ?? props.status)

const dotClass = computed(() => statusMap[props.status]?.dotClass ?? 'bg-quaternary')
</script>
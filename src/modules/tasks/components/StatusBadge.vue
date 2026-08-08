<template>
    <span class="inline-flex items-center gap-2 rounded-md px-3 py-1 text-sm font-medium" :class="badgeInfo.badgeClass">
        <span class="h-2 w-2 rounded-full" :class="badgeInfo.dotClass"></span>

        {{ badgeInfo.label }}
    </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    status: {
        type: String,
        default: '',
    },
})

const STATUS_CONFIG = {
    'To Do': {
        label: 'To Do',
        badgeClass: 'bg-status-primary/30 text-status-primary',
        dotClass: 'bg-status-primary',
    },
    'In Progress': {
        label: 'In Progress',
        badgeClass: 'bg-status-secondary/30 text-status-secondary',
        dotClass: 'bg-status-secondary',
    },
    'Code Review': {
        label: 'Code Review',
        badgeClass: 'bg-status-tertiary/30 text-status-tertiary',
        dotClass: 'bg-status-tertiary',
    },
    'Ready for QA': {
        label: 'Ready for QA',
        badgeClass: 'bg-status-quaternary/30 text-status-quaternary',
        dotClass: 'bg-status-quaternary',
    },
    Done: {
        label: 'Done',
        badgeClass: 'bg-status-quinary/30 text-status-quinary',
        dotClass: 'bg-status-quinary',
    },
}

const STATUS_ALIAS_MAP = {
    1: 'To Do',
    'To Do': 'To Do',

    2: 'In Progress',
    'In Progress': 'In Progress',

    3: 'Code Review',
    'Code Review': 'Code Review',

    4: 'Ready for QA',
    'Ready for QA': 'Ready for QA',

    5: 'Done',
    Done: 'Done',
}

const badgeInfo = computed(() => {
    const key = STATUS_ALIAS_MAP[props.status] || 'To Do'

    return STATUS_CONFIG[key]
})

</script>
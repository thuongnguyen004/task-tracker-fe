<template>
    <span class="flex items-center text-sm font-medium gap-1" :class="textClass">
        <span class="h-2 w-2 rounded-full" :class="dotClass"></span>
        {{ label }}
    </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    priority: {
        type: String,
        required: true,
    },
})

const priorityMap = {
    LOW: {
        label: 'Low',
        textClass: 'text-priority-primary',
        dotClass: 'bg-priority-primary',
    },
    MEDIUM: {
        label: 'Medium',
        textClass: 'text-priority-secondary',
        dotClass: 'bg-priority-secondary',
    },
    HIGH: {
        label: 'High',
        textClass: 'text-priority-tertiary',
        dotClass: 'bg-priority-tertiary',
    },
    CRITICAL: {
        label: 'Critical',
        textClass: 'text-priority-quaternary',
        dotClass: 'bg-priority-quaternary',
    },
}

const label = computed(() => priorityMap[props.priority]?.label ?? props.priority)

const textClass = computed(() => priorityMap[props.priority]?.textClass)

const dotClass = computed(() => priorityMap[props.priority]?.dotClass)
</script>
<template>
    <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-secondary font-semibold">
        {{ initials }}
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    name: {
        type: String,
        default: '',
    },
})

const initials = computed(() => {
    if (!props.name) return '?'

    return props.name
        .trim()
        .split(/\s+/)
        .map(word => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
})
</script>
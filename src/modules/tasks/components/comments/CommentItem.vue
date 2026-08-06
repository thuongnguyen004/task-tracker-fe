<template>
    <div class="flex gap-3 border-b border-border py-5">
        <Avatar :name="author" />

        <div class="flex-1">
            <div class="flex text-sm items-center gap-2">
                <span class="font-semibold text-primary">
                    {{ author }}
                </span>

                <span class="text-sm text-tertiary">
                    {{ time }}
                </span>

                <span v-if="edited" class="rounded bg-quinary px-2 py-0.5 text-xs text-tertiary">
                    Edited
                </span>
            </div>

            <p class="mt-2 text-sm text-primary">
                {{ content }}
            </p>
        </div>
    </div>
</template>

<script setup>
import Avatar from '@/shared/ui/component/Avatar.vue';



defineProps({
    author: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    edited: {
        type: Boolean,
        default: false,
    },
})
</script>
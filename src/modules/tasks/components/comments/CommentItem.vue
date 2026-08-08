<template>
    <div class="flex gap-3 border-b border-border py-5">
        <UserAvatar :name="author" class="bg-primary!" />

    <div class="flex-1">
      <div class="flex items-center gap-2 text-sm">
        <span class="text-primary font-semibold">
          {{ author }}
        </span>

        <span class="text-tertiary text-sm">
          {{ time }}
        </span>

        <span v-if="edited" class="bg-quinary text-tertiary rounded px-2 py-0.5 text-xs">
          Edited
        </span>
      </div>

      <p class="text-primary mt-2 text-sm">
        {{ content }}
      </p>
    </div>
  </div>
</template>

<script setup>
import UserAvatar from '@/shared/ui/component/UserAvatar.vue';


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

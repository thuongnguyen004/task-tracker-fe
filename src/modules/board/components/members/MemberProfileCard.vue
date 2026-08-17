<template>
  <div
    class="bg-card border-border relative z-50 w-64 rounded-xl border p-4 shadow-2xl transition-all select-none"
  >
    <button
      v-if="showClose"
      type="button"
      class="text-tertiary-light hover:text-primary hover:bg-quinary absolute top-3 right-3 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-colors"
      @click="$emit('close')"
    >
      <X class="h-3.5 w-3.5" />
    </button>

    <div class="flex items-center gap-3" :class="{ 'pr-5': showClose }">
      <UserAvatar
        :name="user?.fullName"
        size="lg"
        class="aspect-square h-12! w-12! shrink-0 text-base! shadow-sm"
      />

      <div class="min-w-0 flex-1 space-y-0.5">
        <h3 class="text-primary truncate text-sm leading-snug font-bold">
          {{ user?.fullName }}
        </h3>

        <p class="text-tertiary-light truncate text-xs font-medium">@{{ user?.username }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { UserAvatar } from '@/shared/ui/components'
import { X } from '@lucide/vue'

defineProps({
  user: {
    type: Object,
    default: null,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
})

defineEmits(['close'])
</script>

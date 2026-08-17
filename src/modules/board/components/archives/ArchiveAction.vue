<template>
  <div class="ml-2 flex items-center pt-1.5">
    <div class="group relative">
      <BaseButton
        variant="secondary"
        class="hover:text-danger h-7! w-7! border-none! p-0! text-sm!"
        @click="emit('restore-ticket', ticket.id)"
      >
        <RotateCcw />
      </BaseButton>

      <span
        class="absolute right-0 bottom-full mb-2 rounded-md bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
      >
        Restore
      </span>
    </div>
  </div>
</template>

<script setup>
import BaseButton from '@/shared/ui/components/BaseButton.vue'
import { RotateCcw } from '@lucide/vue'

defineProps({
  ticket: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['restore-ticket'])
</script>

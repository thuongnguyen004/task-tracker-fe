<template>
  <div class="ml-2 flex items-center gap-2 px-3 pt-1.5">
    <BaseButton
      variant="secondary"
      class="hover:text-danger h-7! w-7! border-none! p-0! text-sm!"
      @click="emit('restore-ticket', ticket.id)"
    >
      Restore
    </BaseButton>
  </div>
</template>

<script setup>
import BaseButton from '@/shared/ui/components/BaseButton.vue'

defineProps({
  ticket: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['restore-ticket'])
</script>

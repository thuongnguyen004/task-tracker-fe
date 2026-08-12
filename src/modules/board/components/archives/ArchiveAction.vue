<template>
  <div class="ml-2 flex items-center gap-2 px-3 pt-1.5">
    <BaseButton
      variant="secondary"
      class="hover:text-danger h-7! w-7! border-none! p-0! text-sm!"
      @click="emit('restore-ticket', ticket.id)"
    >
      Restore
    </BaseButton>

    <span class="bg-quaternary mx-4 h-1.5 w-1.5 scale-75 rounded-full"></span>

    <BaseButton
      variant="secondary"
      class="hover:text-danger h-7! w-7! border-none! p-0! text-sm!"
      @click="emit('delete-ticket', ticket.id)"
    >
      Delete
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

const emit = defineEmits(['restore-ticket', 'delete-ticket'])
</script>

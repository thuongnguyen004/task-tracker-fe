<template>
  <div class="flex h-full min-w-60 flex-1 flex-col overflow-hidden">
    <div class="my-3 flex shrink-0 items-center gap-2">
      <h2 class="text-xs font-bold tracking-wider text-gray-700 uppercase">
        {{ props.status.name }}
      </h2>

      <span class="text-tertiary text-xs font-medium">
        {{ localTickets.length }}
      </span>
    </div>

    <div class="mb-2 h-1.5 w-full shrink-0 rounded-t-full" :class="props.status.accentBg" />

    <draggableComponent
      v-model="localTickets"
      class="flex flex-1 flex-col gap-3 overflow-y-auto pr-1"
      group="tickets"
      item-key="id"
      @change="handleChange"
    >
      <template #item="{ element: ticket }">
        <TicketCard :ticket="ticket" @select="emit('select-ticket', ticket.id)" />
      </template>
    </draggableComponent>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import TicketCard from './TicketCard.vue'
import draggableComponent from 'vuedraggable'

const props = defineProps({
  status: {
    type: Object,
    required: true,
  },

  tickets: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['select-ticket', 'change-status','refresh-tickets'])

const localTickets = ref([...props.tickets])

watch(
  () => props.tickets,
  (newTickets) => {
    localTickets.value = [...newTickets]
  },
)

const handleChange = (event) => {
  if (event.moved) {
    emit('refresh-tickets')
    return
  }

  if (event.added) {
    const ticket = event.added.element

    emit('change-status', ticket.id, props.status.statusId)
  }
}
</script>

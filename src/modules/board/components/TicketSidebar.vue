<template>
  <div class="bg-secondary h-fit space-y-6 px-6 py-6">
    <h3 class="text-md text-tertiary font-semibold">DETAILS</h3>

    <div>
      <p class="text-tertiary-light mb-2 text-sm font-semibold">STATUS</p>

      <StatusBadge :status="ticket.status" />
    </div>

    <div>
      <p class="text-tertiary-light mb-2 text-sm font-semibold">PRIORITY</p>

      <PriorityBadge :priority="ticket.priority" class="text-sm!" />
    </div>

    <div>
      <p class="text-tertiary-light mb-2 text-sm font-semibold">ASSIGNEE</p>

      <div v-if="ticket.assignee" class="flex items-center gap-2 text-sm">
        <UserAvatar :name="ticket.assignee" class="bg-primary!" />

        <span>{{ ticket.assignee }}</span>
      </div>

      <span v-else class="text-tertiary-light text-sm">Unassigned</span>
    </div>

    <div>
      <p class="text-tertiary-light mb-2 text-sm font-semibold">CREATED BY</p>

      <div class="flex items-center gap-2 text-sm">
        <UserAvatar :name="ticket.createdBy || '-'" class="bg-primary!" />

        <span>{{ ticket.createdBy || '-' }}</span>
      </div>
    </div>

    <div>
      <p class="text-tertiary-light mb-2 text-sm font-semibold">CREATED AT</p>

      <div class="text-tertiary-light flex items-center text-sm">
        <span>{{ formatDateTime(ticket.createdAt) }}</span>
      </div>
    </div>

    <div>
      <p class="text-tertiary-light mb-2 text-sm font-semibold">UPDATED AT</p>

      <div class="text-tertiary-light flex items-center text-sm">
        <span>{{ formatDateTime(ticket.updatedAt) }}</span>
      </div>
    </div>

    <div class="border-border w-full border-t"></div>

    <div class="space-y-3">
      <template v-if="!ticket.archived">
        <BaseButton @click="emit('open-modal', ticket)"> Edit Ticket</BaseButton>

        <BaseButton variant="tertiary" @click="emit('archive-ticket', ticket.id)">
          Archive Ticket
        </BaseButton>
      </template>
      <template v-else>
        <BaseButton @click="emit('restore-ticket', ticket.id)"> Restore Ticket </BaseButton>

        <BaseButton variant="tertiary" @click="emit('delete-ticket', ticket.id)">
          Delete Ticket
        </BaseButton>
      </template>
    </div>
  </div>
</template>

<script setup>
import { formatDateTime } from '@/shared/utils'
import PriorityBadge from './PriorityBadge.vue'
import StatusBadge from './StatusBadge.vue'
import { UserAvatar, BaseButton } from '@/shared/ui/components'

defineProps({
  ticket: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['open-modal', 'archive-ticket', 'restore-ticket', 'delete-ticket'])
</script>

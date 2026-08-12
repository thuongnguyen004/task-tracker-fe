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
        <UserAvatar :name="ticket.assignee" />

        <span>{{ ticket.assignee }}</span>
      </div>

      <span v-else class="text-tertiary-light text-sm">Unassigned</span>
    </div>

    <div>
      <p class="text-tertiary-light mb-2 text-sm font-semibold">CREATED BY</p>

      <div class="flex items-center gap-2 text-sm">
        <UserAvatar :name="ticket.createdBy || '-'" />

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

        <BaseButton variant="tertiary" @click="openArchiveConfirm"> Archive Ticket </BaseButton>

        <ConfirmModal
          v-model="showArchiveConfirm"
          title="Confirm archive ticket."
          message="Archive this ticket? It will be removed from the board."
          @confirm="handleConfirmArchive"
          @cancel="handleCancelArchive"
        />
      </template>
      <template v-else>
        <BaseButton @click="emit('restore-ticket', ticket.id)"> Restore Ticket </BaseButton>
      </template>
    </div>
  </div>
</template>

<script setup>
import { formatDateTime } from '@/shared/utils'
import PriorityBadge from './PriorityBadge.vue'
import StatusBadge from './StatusBadge.vue'
import { UserAvatar, BaseButton } from '@/shared/ui/components'
import ConfirmModal from '@/shared/ui/components/Modals/ConfirmModal.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { path } from '@/shared/constants/paths.js'

const router = useRouter()

const props = defineProps({
  ticket: {
    type: Object,
    default: () => ({}),
  },
})

const showArchiveConfirm = ref(false)

const openArchiveConfirm = () => {
  showArchiveConfirm.value = true
}

const handleConfirmArchive = () => {
  emit('archive-ticket', props.ticket.id)
  showArchiveConfirm.value = false
  router.push({ name: path.task.board.name })
}

const handleCancelArchive = () => {
  showArchiveConfirm.value = false
}
const emit = defineEmits(['open-modal', 'archive-ticket', 'restore-ticket'])
</script>

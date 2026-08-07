<template>
  <div class="bg-secondary h-screen space-y-6 px-6 py-6">
    <h3 class="text-md text-tertiary font-semibold">DETAILS</h3>

    <div>
      <p class="text-tertiary mb-2 text-sm font-semibold">STATUS</p>
      <StatusBadge status="TODO" />
    </div>

    <div>
      <p class="text-tertiary mb-2 text-sm font-semibold">PRIORITY</p>
      <PriorityBadge priority="HIGH" />
    </div>

    <div>
      <p class="text-tertiary mb-2 text-sm font-semibold">ASSIGNEE</p>

      <div class="flex items-center gap-2 text-sm">
        <Avatar name="Alex Lee" />
        <span>Alex Lee</span>
      </div>
    </div>

    <div>
      <p class="text-tertiary mb-2 text-sm font-semibold">CREATED BY</p>

      <div class="flex items-center gap-2 text-sm">
        <Avatar name="Alex Lee" />
        <span>Alex Lee</span>
      </div>
    </div>

    <div>
      <p class="text-tertiary mb-2 text-sm font-semibold">CREATED AT</p>

      <div class="text-tertiary flex items-center text-sm">
        <span>Aug 6, 2026</span>

        <span class="bg-tertiary mx-2 h-1 w-1 rounded-full"></span>

        <span>10:30 AM</span>
      </div>
    </div>

    <div>
      <p class="text-tertiary mb-2 text-sm font-semibold">UPDATED AT</p>

      <div class="text-tertiary flex items-center text-sm">
        <span>Aug 6, 2026</span>

        <span class="bg-tertiary mx-2 h-1 w-1 rounded-full"></span>

        <span>10:30 AM</span>
      </div>
    </div>

    <div class="border-border w-full border-t"></div>

    <div class="space-y-3">
      <BaseButton @click="emit('open-modal', props.ticketById)"> Edit </BaseButton>

      <BaseButton variant="tertiary"> Archive Ticket </BaseButton>
    </div>
  </div>
</template>

<script setup>
import PriorityBadge from '@/shared/ui/component/badges/PriorityBadge.vue'
import Avatar from '@/shared/ui/component/Avatar.vue'
import StatusBadge from '@/shared/ui/component/badges/StatusBadge.vue'
import BaseButton from '@/shared/ui/component/BaseButton.vue'

const emit = defineEmits(['open-modal'])

const props = defineProps({
  ticketById: {
    type: Object,
    default: () => {},
  },
})
</script>

<template>
  <div class="flex items-center -space-x-1.5">
    <UserAvatar
      v-for="member in displayedMembers"
      :key="member.name"
      :name="member.name"
      size="sm"
      class="ring-2 ring-secondary"
    />
    <span
      v-if="remainingCount > 0"
      class="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-quinary text-xs font-bold text-tertiary ring-2 ring-secondary"
      :title="`${remainingCount} more members`"
    >
      +{{ remainingCount }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { UserAvatar } from '@/shared/ui/components'

const props = defineProps({
  teamMembers: {
    type: Array,
    default: () => [],
  },
  maxAvatars: {
    type: Number,
    default: 3,
  },
})

const displayedMembers = computed(() => props.teamMembers.slice(0, props.maxAvatars))
const remainingCount = computed(() => Math.max(0, props.teamMembers.length - props.maxAvatars))
</script>

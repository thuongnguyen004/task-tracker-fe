<template>
  <div ref="avatarBarRef" class="relative pr-1">
    <div class="flex items-center -space-x-1.5 px-1.5 py-1">
      <button
        v-for="member in displayedMembers"
        :key="member.id"
        type="button"
        class="shrink-0 cursor-pointer transition-transform hover:z-10 hover:scale-110 focus:outline-hidden"
        :title="`${member.fullName} (@${member.username})`"
        @click.stop="toggleProfilePopover(member)"
      >
        <UserAvatar
          :name="member.fullName"
          size="sm"
          class="aspect-square shrink-0 rounded-full ring-2 ring-white"
        />
      </button>

      <button
        v-if="remainingCount > 0"
        type="button"
        class="bg-quinary text-tertiary relative z-10 flex aspect-square h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-xs font-bold ring-2 ring-white transition-transform select-none hover:z-20 hover:scale-110 focus:outline-hidden"
        :title="`${remainingCount} more members`"
        @click.stop="toggleMembersPopover"
      >
        +{{ remainingCount }}
      </button>
    </div>

    <div v-if="selectedUser" class="absolute top-10 right-0 z-50 pt-1">
      <MemberProfileCard :user="selectedUser" show-close @close="closePopovers" />
    </div>

    <div v-if="isMembersPopoverOpen" class="absolute top-10 right-0 z-50 pt-1">
      <MembersPopover :members="members" @close="closePopovers" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { UserAvatar } from '@/shared/ui/components'
import MemberProfileCard from './MemberProfileCard.vue'
import MembersPopover from './MembersPopover.vue'

const props = defineProps({
  members: {
    type: Array,
    default: () => [],
  },

  maxAvatars: {
    type: Number,
    default: 3,
  },
})

const avatarBarRef = ref(null)

const selectedUser = ref(null)

const isMembersPopoverOpen = ref(false)

const displayedMembers = computed(() => props.members.slice(0, props.maxAvatars))

const remainingCount = computed(() => Math.max(0, props.members.length - props.maxAvatars))

const closePopovers = () => {
  selectedUser.value = null
  isMembersPopoverOpen.value = false
}

const toggleProfilePopover = (member) => {
  isMembersPopoverOpen.value = false

  selectedUser.value = selectedUser.value?.id === member.id ? null : member
}

const toggleMembersPopover = () => {
  selectedUser.value = null
  isMembersPopoverOpen.value = !isMembersPopoverOpen.value
}

const handleClickOutside = (event) => {
  if (!avatarBarRef.value?.contains(event.target)) {
    closePopovers()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div
    class="bg-card border-border relative z-50 w-80 space-y-3.5 rounded-xl border p-4 select-none"
  >
    <div class="flex items-center justify-between">
      <h3 class="text-primary text-sm font-bold">Board members</h3>

      <button
        type="button"
        class="text-tertiary-light hover:bg-quinary hover:text-primary flex h-6 w-6 items-center justify-center rounded-full transition-colors"
        @click="$emit('close')"
      >
        <X class="h-3.5 w-3.5" />
      </button>
    </div>

    <div class="relative">
      <Search class="text-tertiary-light absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2" />

      <BaseInput v-model="searchQuery" placeholder="Search members" class="py-1.5 pl-8 text-xs" />
    </div>

    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <h4 class="text-tertiary-light text-[11px] font-semibold tracking-wider uppercase">
          Workspace members
        </h4>

        <span class="text-tertiary-light text-[11px] font-medium">
          {{ filteredMembers.length }}
        </span>
      </div>

      <div
        v-if="filteredMembers.length"
        class="-m-1.5 flex max-h-52 flex-wrap gap-2.5 overflow-y-auto p-1.5"
      >
        <button
          v-for="member in filteredMembers"
          :key="member.id"
          type="button"
          class="group relative cursor-pointer focus:outline-hidden"
          :title="`${member.fullName} (@${member.username})`"
          @click="selectMember(member)"
        >
          <UserAvatar
            :name="member.fullName"
            size="sm"
            class="group-hover:ring-tertiary-light aspect-square shrink-0 transition-transform group-hover:scale-105 group-hover:ring-2"
            :class="{
              'ring-tertiary-light ring-2': selectedMember?.id === member.id,
            }"
          />
        </button>
      </div>

      <p v-else class="text-tertiary-light py-4 text-center text-xs">No members found</p>

      <template v-if="selectedMember">
        <hr class="border-border my-2" />

        <MemberProfileCard
          :user="selectedMember"
          :show-close="false"
          class="border-primary/20 w-full! shadow-md"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { Search, X } from '@lucide/vue'
import { BaseInput, UserAvatar } from '@/shared/ui/components'
import MemberProfileCard from './MemberProfileCard.vue'

const props = defineProps({
  members: {
    type: Array,
    default: () => [],
  },
})

defineEmits(['close'])

const searchQuery = ref('')
const selectedMember = ref(null)

const filteredMembers = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  if (!query) {
    return props.members
  }

  return props.members.filter((member) => {
    const fullName = member.fullName?.toLowerCase() ?? ''

    const username = member.username?.toLowerCase() ?? ''

    return fullName.includes(query) || username.includes(query)
  })
})

const selectMember = (member) => {
  selectedMember.value = selectedMember.value?.id === member.id ? null : member
}

watch(searchQuery, () => {
  selectedMember.value = null
})
</script>

<template>
  <div class="flex flex-wrap items-center justify-between gap-4 pb-4">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Sprint Board</h1>

      <p class="text-tertiary mt-0.5 text-xs">
        {{ totalTickets }} active tickets · {{ totalColumns }} columns
      </p>
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <!-- Search Input Box -->
      <div class="relative min-w-48 flex-1 sm:w-64 sm:flex-none">
        <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          v-model="boardStore.search"
          type="text"
          placeholder="Search tickets..."
          class="h-9 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-8 text-xs text-gray-800 placeholder-gray-400 transition-colors focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          v-if="boardStore.search"
          type="button"
          @click="boardStore.search = ''"
          class="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          title="Clear search"
        >
          <X class="h-3.5 w-3.5" />
        </button>
      </div>

      <!-- New Ticket Button -->
      <BaseButton
        variant="primary"
        class="h-9! w-auto! px-3.5 py-0! text-xs font-semibold whitespace-nowrap"
        @click="$emit('open-modal')"
      >
        <Plus class="h-4 w-4" />

        New Ticket
      </BaseButton>

      <!-- Filters Button & Popover -->
      <div class="relative" ref="filterPopoverRef">
        <BaseButton
          variant="secondary"
          class="h-9! w-auto! px-3.5 py-0! text-xs font-semibold whitespace-nowrap text-gray-700 transition-colors"
          :class="{ 'border-blue-500 bg-blue-50 text-blue-700 font-bold': boardStore.hasActiveFilters }"
          @click="toggleFiltersPopover"
        >
          <SlidersHorizontal
            class="h-4 w-4"
            :class="boardStore.hasActiveFilters ? 'text-blue-600' : 'text-gray-500'"
          />

          Filters
          <span
            v-if="boardStore.activeFiltersCount > 0"
            class="ml-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white"
          >
            {{ boardStore.activeFiltersCount }}
          </span>
        </BaseButton>

        <!-- Filter Dropdown / Popover -->
        <div
          v-if="showFiltersPopover"
          class="absolute right-0 top-11 z-30 w-80 rounded-xl border border-gray-200 bg-white p-4 shadow-xl"
        >
          <div class="mb-3 flex items-center justify-between border-b border-gray-100 pb-2">
            <span class="text-xs font-bold uppercase tracking-wider text-gray-900">Filter Criteria</span>
            <button
              v-if="boardStore.hasActiveFilters"
              type="button"
              class="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800"
              @click="boardStore.clearFilters()"
            >
              <RotateCcw class="h-3 w-3" />
              Clear all
            </button>
          </div>

          <!-- Assignee Filter (Single-select) -->
          <div class="mb-4">
            <label class="mb-1.5 block text-xs font-semibold text-gray-700">Assignee</label>
            <select
              :value="currentAssigneeValue"
              @change="handleAssigneeChange($event.target.value)"
              class="h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All Assignees</option>
              <option value="UNASSIGNED">Unassigned (No Assignee)</option>
              <option
                v-for="assignee in availableAssignees"
                :key="assignee.value || assignee.name"
                :value="assignee.value || assignee.name"
              >
                {{ assignee.label || assignee.name }}
              </option>
            </select>
          </div>

          <!-- Priority Filter (Multi-select) -->
          <div>
            <label class="mb-1.5 block text-xs font-semibold text-gray-700">Priority (Multi-select)</label>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="p in priorityOptions"
                :key="p.value"
                type="button"
                class="flex items-center justify-between rounded-lg border px-3 py-2 text-xs font-medium transition-all"
                :class="isPrioritySelected(p.value)
                  ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold shadow-xs'
                  : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'"
                @click="togglePriority(p.value)"
              >
                <span class="flex items-center gap-1.5">
                  <span class="h-2 w-2 rounded-full" :class="p.dotClass" />
                  {{ p.label }}
                </span>
                <Check v-if="isPrioritySelected(p.value)" class="h-3.5 w-3.5 text-blue-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Team Members Avatars -->
      <div class="flex items-center -space-x-1.5">
        <UserAvatar
          v-for="member in displayedMembers"
          :key="member.name"
          :name="member.name"
          size="sm"
          class="ring-2 ring-white"
        />

        <span
          v-if="remainingCount > 0"
          class="bg-quinary text-tertiary flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ring-2 ring-white select-none"
          :title="`${remainingCount} more members`"
        >
          +{{ remainingCount }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { BaseButton, UserAvatar } from '@/shared/ui/components'
import { Plus, SlidersHorizontal, Search, X, Check, RotateCcw } from '@lucide/vue'
import { useSprintBoardStore } from '../stores'

const boardStore = useSprintBoardStore()

const props = defineProps({
  totalTickets: {
    type: Number,
    default: 12,
  },

  totalColumns: {
    type: Number,
    default: 5,
  },

  teamMembers: {
    type: Array,
    default: () => [
      { name: 'Bun Tran' },
      { name: 'Tinh Tran' },
      { name: 'Thuong Nguyen' },
      { name: 'Bao Mai' },
    ],
  },

  assignees: {
    type: Array,
    default: () => [],
  },

  maxAvatars: {
    type: Number,
    default: 3,
  },
})

const emit = defineEmits(['toggle-filters', 'create-ticket', 'open-modal'])

const showFiltersPopover = ref(false)
const filterPopoverRef = ref(null)

const toggleFiltersPopover = () => {
  showFiltersPopover.value = !showFiltersPopover.value
  emit('toggle-filters')
}

const handleClickOutside = (event) => {
  if (filterPopoverRef.value && !filterPopoverRef.value.contains(event.target)) {
    showFiltersPopover.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const displayedMembers = computed(() => {
  return props.teamMembers.slice(0, props.maxAvatars)
})

const remainingCount = computed(() => {
  return Math.max(0, props.teamMembers.length - props.maxAvatars)
})

const availableAssignees = computed(() => {
  if (props.assignees && props.assignees.length > 0) {
    return props.assignees
  }
  if (props.teamMembers && props.teamMembers.length > 0) {
    return props.teamMembers.map((m) => ({ value: m.name, label: m.name }))
  }
  return []
})

const priorityOptions = [
  { value: 'Low', label: 'Low', dotClass: 'bg-priority-primary' },
  { value: 'Medium', label: 'Medium', dotClass: 'bg-priority-secondary' },
  { value: 'High', label: 'High', dotClass: 'bg-priority-tertiary' },
  { value: 'Critical', label: 'Critical', dotClass: 'bg-priority-quaternary' },
]

const priorityAliasMap = {
  1: 'low', low: 1, Low: 1,
  2: 'medium', medium: 2, Medium: 2,
  3: 'high', high: 3, High: 3,
  4: 'critical', critical: 4, Critical: 4,
}

const isPrioritySelected = (val) => {
  const selected = boardStore.selectedPriorityIds || []
  return selected.some((item) => {
    if (String(item).toLowerCase() === String(val).toLowerCase()) return true
    if (priorityAliasMap[item] && String(priorityAliasMap[item]).toLowerCase() === String(val).toLowerCase()) return true
    if (priorityAliasMap[val] && String(priorityAliasMap[val]).toLowerCase() === String(item).toLowerCase()) return true
    return false
  })
}

const togglePriority = (val) => {
  const selected = [...(boardStore.selectedPriorityIds || [])]
  const idx = selected.findIndex((item) => {
    if (String(item).toLowerCase() === String(val).toLowerCase()) return true
    if (priorityAliasMap[item] && String(priorityAliasMap[item]).toLowerCase() === String(val).toLowerCase()) return true
    if (priorityAliasMap[val] && String(priorityAliasMap[val]).toLowerCase() === String(item).toLowerCase()) return true
    return false
  })

  if (idx > -1) {
    selected.splice(idx, 1)
  } else {
    selected.push(val)
  }
  boardStore.selectedPriorityIds = selected
}

const currentAssigneeValue = computed(() => {
  if (boardStore.unassigned) return 'UNASSIGNED'
  if (boardStore.selectedAssigneeId === 'UNASSIGNED') return 'UNASSIGNED'
  return boardStore.selectedAssigneeId || ''
})

const handleAssigneeChange = (val) => {
  if (val === 'UNASSIGNED') {
    boardStore.unassigned = true
    boardStore.selectedAssigneeId = 'UNASSIGNED'
  } else if (!val) {
    boardStore.unassigned = false
    boardStore.selectedAssigneeId = null
  } else {
    boardStore.unassigned = false
    boardStore.selectedAssigneeId = val
  }
}
</script>

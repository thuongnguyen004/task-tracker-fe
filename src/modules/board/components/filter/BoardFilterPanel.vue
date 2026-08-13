<template>
  <div>
    <div class="border-border mb-3 flex items-center justify-between border-b pb-2">
      <span class="text-primary text-xs font-bold tracking-wider uppercase">Filter Criteria</span>
      <button
        v-if="boardStore.hasActiveFilters"
        type="button"
        class="text-blue hover:text-blue-hover flex items-center gap-1 text-xs font-medium"
        @click="boardStore.clearFilters()"
      >
        <RotateCcw class="h-3 w-3" />
        Clear filters
      </button>
    </div>

    <div class="mb-4">
      <label class="text-primary mb-1.5 block text-xs font-semibold">Assignee</label>
      <select
        :value="currentAssigneeValue"
        @change="handleAssigneeChange($event.target.value)"
        class="border-border bg-secondary text-primary focus:border-blue focus:ring-blue h-9 w-full rounded-lg border px-3 text-xs focus:ring-1 focus:outline-none"
      >
        <option value="">Select an assignee</option>
        <option value="UNASSIGNED">Unassigned (No Assignee)</option>
        <option
          v-for="assignee in props.assignees"
          :key="assignee.value || assignee.name"
          :value="assignee.value || assignee.name"
        >
          {{ assignee.label || assignee.name }}
        </option>
      </select>
    </div>

    <div>
      <label class="text-primary mb-1.5 block text-xs font-semibold">Priority</label>
      <div class="grid grid-cols-2 gap-2">
        <button
          v-for="p in priorityOptions"
          :key="p.value"
          type="button"
          class="flex items-center justify-between rounded-lg border px-3 py-2 text-xs font-medium transition-all"
          :class="
            isPrioritySelected(p.value)
              ? 'border-blue bg-blue-subtle text-blue-foreground font-semibold shadow-xs'
              : 'border-border bg-secondary text-primary hover:bg-quinary'
          "
          @click="togglePriority(p.value)"
        >
          <span class="flex items-center gap-1.5">
            <span class="h-2 w-2 rounded-full" :class="p.dotClass" />
            {{ p.label }}
          </span>
          <Check v-if="isPrioritySelected(p.value)" class="text-blue h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Check, RotateCcw } from '@lucide/vue'
import { useSprintBoardStore } from '../../stores'

const props = defineProps({
  assignees: {
    type: Array,
    default: () => [],
  },
})

const boardStore = useSprintBoardStore()

const priorityOptions = [
  { value: 'Low', label: 'Low', dotClass: 'bg-priority-primary' },
  { value: 'Medium', label: 'Medium', dotClass: 'bg-priority-secondary' },
  { value: 'High', label: 'High', dotClass: 'bg-priority-tertiary' },
  { value: 'Critical', label: 'Critical', dotClass: 'bg-priority-quaternary' },
]

const priorityAliasMap = {
  1: 'low',
  low: 1,
  Low: 1,
  2: 'medium',
  medium: 2,
  Medium: 2,
  3: 'high',
  high: 3,
  High: 3,
  4: 'critical',
  critical: 4,
  Critical: 4,
}

const isPrioritySelected = (val) => {
  const selected = boardStore.selectedPriorityIds || []
  return selected.some((item) => {
    if (String(item).toLowerCase() === String(val).toLowerCase()) return true
    if (
      priorityAliasMap[item] &&
      String(priorityAliasMap[item]).toLowerCase() === String(val).toLowerCase()
    )
      return true
    if (
      priorityAliasMap[val] &&
      String(priorityAliasMap[val]).toLowerCase() === String(item).toLowerCase()
    )
      return true
    return false
  })
}

const togglePriority = (val) => {
  const selected = [...(boardStore.selectedPriorityIds || [])]
  const idx = selected.findIndex((item) => {
    if (String(item).toLowerCase() === String(val).toLowerCase()) return true
    if (
      priorityAliasMap[item] &&
      String(priorityAliasMap[item]).toLowerCase() === String(val).toLowerCase()
    )
      return true
    if (
      priorityAliasMap[val] &&
      String(priorityAliasMap[val]).toLowerCase() === String(item).toLowerCase()
    )
      return true
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

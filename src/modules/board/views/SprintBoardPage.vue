<template>
  <div class="flex h-full flex-col gap-4 overflow-hidden">
    <BoardHeader
      class="shrink-0"
      :total-tickets="totalActiveTickets"
      :total-columns="columns.length"
      :team-members="assignees"
      @open-modal="openCreateTicketModal(statuses, priorities)"
    />

    <div
      v-if="hasActiveFilters"
      class="border-blue-muted bg-blue-subtle/70 text-blue-deep flex shrink-0 flex-wrap items-center gap-2 rounded-lg border px-3.5 py-2 text-xs"
    >
      <span class="text-blue-deep font-bold">Active Filters:</span>

      <span
        v-if="boardStore.search"
        class="border-blue-muted-border bg-secondary text-blue-hover inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-medium shadow-xs"
      >
        Keyword: "{{ boardStore.search }}"
        <button type="button" @click="boardStore.search = ''" class="hover:text-blue-deepest">
          <X class="h-3 w-3" />
        </button>
      </span>

      <span
        v-if="boardStore.unassigned || boardStore.selectedAssigneeId === 'UNASSIGNED'"
        class="border-blue-muted-border bg-secondary text-blue-hover inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-medium shadow-xs"
      >
        Assignee: Unassigned
        <button type="button" @click="clearAssigneeFilter" class="hover:text-blue-deepest">
          <X class="h-3 w-3" />
        </button>
      </span>

      <span
        v-else-if="boardStore.selectedAssigneeId"
        class="border-blue-muted-border bg-secondary text-blue-hover inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-medium shadow-xs"
      >
        Assignee: {{ selectedAssigneeName }}
        <button
          type="button"
          @click="boardStore.selectedAssigneeId = null"
          class="hover:text-blue-deepest"
        >
          <X class="h-3 w-3" />
        </button>
      </span>

      <span
        v-if="boardStore.selectedPriorityIds && boardStore.selectedPriorityIds.length > 0"
        class="border-blue-muted-border bg-secondary text-blue-hover inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-medium shadow-xs"
      >
        Priority: {{ boardStore.selectedPriorityIds.join(', ') }}
        <button
          type="button"
          @click="boardStore.selectedPriorityIds = []"
          class="hover:text-blue-deepest"
        >
          <X class="h-3 w-3" />
        </button>
      </span>

      <button
        type="button"
        class="text-blue-foreground hover:text-blue-deep ml-auto text-xs font-semibold hover:underline"
        @click="boardStore.clearAllFilter()"
      >
        Clear all
      </button>
    </div>

    <div
      v-if="hasActiveFilters && totalActiveTickets === 0"
      class="border-border bg-quinary/40 my-auto flex flex-1 flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 text-center"
    >
      <div
        class="bg-blue-subtle text-blue mb-4 flex h-16 w-16 items-center justify-center rounded-full"
      >
        <SearchX class="h-8 w-8" />
      </div>

      <h3 class="text-primary text-base font-bold">No tickets found</h3>

      <p class="text-tertiary mt-1 max-w-sm text-xs">
        No tickets match your search or filter criteria. Try clearing or adjusting your filters.
      </p>
    </div>

    <div v-else class="flex flex-1 gap-4 overflow-x-auto overflow-y-hidden pb-2">
      <BoardColumn
        v-for="col in columns"
        :key="col.id"
        :status="col"
        :tickets="ticketsByColumn[col.id] || []"
        @select-ticket="openTicketDetails"
        @change-status="handleChangeStatus"
        @refresh-tickets="boardStore.fetchBoardData"
      />
    </div>

    <TicketFormModal
      title="Create New Ticket"
      buttonTitle="Create Ticket"
      v-model:open="open"
      v-model:forms="forms"
      :statuses="statuses"
      :priorities="priorities"
      :assignees="assignees"
      :errors="errors"
      :disable-status="true"
      :loading="loading"
      @close-modal="toggleModalTicket"
      @handle-ticket="handleNewTicket"
      @clear-error="clearFieldError"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, provide } from 'vue'
import { BoardHeader, BoardColumn, TicketFormModal } from '../components'
import { useSprintBoardStore } from '../stores'
import { useModal, useTicketActions, useTicketActivity, useTicketMetadata } from '../composables'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { path } from '@/shared/constants/paths'
import { SearchX, X } from '@lucide/vue'

const modal = useModal()

const fetch = useTicketMetadata()

const activity = useTicketActivity()

const { open, toggleModalTicket, openCreateTicketModal, clearFieldError, forms, errors } = modal

const { getAllTicketActivities, ticketActivities, showLoadMoreButton, handleLoadMoreActivity } = activity

const { handleNewTicket, handleChangeStatus, loading } = useTicketActions(modal, fetch, activity)


const { statuses, priorities, assignees } = fetch

const boardStore = useSprintBoardStore()
const router = useRouter()
const { columns, ticketsByColumn, totalActiveTickets, hasActiveFilters } = storeToRefs(boardStore)

const selectedAssigneeName = computed(() => {
  const sel = boardStore.selectedAssigneeId
  if (!sel) return ''
  const member = assignees.value?.find(
    (a) => String(a.id) === String(sel) || a.name === sel || a.username === sel,
  )
  return member ? member.name || member.username : sel
})

onMounted(() => {
  boardStore.fetchBoardData()
  getAllTicketActivities()
})

const clearAssigneeFilter = () => {
  boardStore.selectedAssigneeId = null
  boardStore.unassigned = false
}

const openTicketDetails = (code) => {
  router.push({ name: path.task.details.name, params: { code } })
}

provide('ticketActivities', ticketActivities)
provide('showLoadMoreButton', showLoadMoreButton)
provide('handleLoadMoreActivity', handleLoadMoreActivity)

</script>

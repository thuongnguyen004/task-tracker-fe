<template>
  <div class="flex h-full flex-col gap-4 overflow-hidden">
    <BoardHeader
      class="shrink-0"
      :total-tickets="totalActiveTickets"
      :total-columns="columns.length"
      :team-members="teamMembers"
      :assignees="assignees"
      @open-modal="openCreateTicketModal(statuses, priorities)"
    />

    <!-- Active Filter Summary Bar -->
    <div
      v-if="hasActiveFilters"
      class="flex flex-wrap items-center gap-2 rounded-lg bg-blue-50/70 px-3.5 py-2 text-xs text-blue-900 border border-blue-100 shrink-0"
    >
      <span class="font-bold text-blue-900">Active Filters:</span>

      <span
        v-if="boardStore.search"
        class="inline-flex items-center gap-1.5 rounded-md bg-white px-2 py-1 text-xs font-medium text-blue-800 shadow-xs border border-blue-200"
      >
        Keyword: "{{ boardStore.search }}"
        <button type="button" @click="boardStore.search = ''" class="hover:text-blue-950">
          <X class="h-3 w-3" />
        </button>
      </span>

      <span
        v-if="boardStore.unassigned || boardStore.selectedAssigneeId === 'UNASSIGNED'"
        class="inline-flex items-center gap-1.5 rounded-md bg-white px-2 py-1 text-xs font-medium text-blue-800 shadow-xs border border-blue-200"
      >
        Assignee: Unassigned
        <button type="button" @click="boardStore.selectedAssigneeId = null; boardStore.unassigned = false" class="hover:text-blue-950">
          <X class="h-3 w-3" />
        </button>
      </span>

      <span
        v-else-if="boardStore.selectedAssigneeId"
        class="inline-flex items-center gap-1.5 rounded-md bg-white px-2 py-1 text-xs font-medium text-blue-800 shadow-xs border border-blue-200"
      >
        Assignee: {{ boardStore.selectedAssigneeId }}
        <button type="button" @click="boardStore.selectedAssigneeId = null" class="hover:text-blue-950">
          <X class="h-3 w-3" />
        </button>
      </span>

      <span
        v-if="boardStore.selectedPriorityIds && boardStore.selectedPriorityIds.length > 0"
        class="inline-flex items-center gap-1.5 rounded-md bg-white px-2 py-1 text-xs font-medium text-blue-800 shadow-xs border border-blue-200"
      >
        Priority: {{ boardStore.selectedPriorityIds.join(', ') }}
        <button type="button" @click="boardStore.selectedPriorityIds = []" class="hover:text-blue-950">
          <X class="h-3 w-3" />
        </button>
      </span>

      <button
        type="button"
        class="ml-auto text-xs font-semibold text-blue-700 hover:text-blue-900 hover:underline"
        @click="boardStore.clearFilters()"
      >
        Clear all
      </button>
    </div>

    <!-- Empty State when no tickets match active search/filters -->
    <div
      v-if="hasActiveFilters && totalActiveTickets === 0"
      class="my-auto flex flex-1 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-12 text-center"
    >
      <div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
        <SearchX class="h-8 w-8" />
      </div>

      <h3 class="text-base font-bold text-gray-900">No tickets found</h3>

      <p class="mt-1 max-w-sm text-xs text-gray-500">
        No tickets match your search or filter criteria. Try clearing or adjusting your filters.
      </p>

      <BaseButton
        variant="secondary"
        class="mt-5! h-9! w-auto! px-4! text-xs font-semibold"
        @click="boardStore.clearFilters()"
      >
        <RotateCcw class="mr-1.5 h-3.5 w-3.5" />
        Clear all search & filters
      </BaseButton>
    </div>

    <!-- Board Columns -->
    <div v-else class="flex flex-1 gap-4 overflow-x-auto overflow-y-hidden pb-2">
      <BoardColumn
        v-for="col in columns"
        :key="col.id"
        :status="col"
        :tickets="ticketsByColumn[col.statusId] || []"
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
import { onMounted } from 'vue'
import { BoardHeader, BoardColumn, TicketFormModal } from '../components'
import { useSprintBoardStore } from '../stores'
import { useModal, useTicketActions, useTicketMetadata } from '../composables'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { path } from '@/shared/constants/paths'
import { BaseButton } from '@/shared/ui/components'
import { SearchX, RotateCcw, X } from '@lucide/vue'

const modal = useModal()

const fetch = useTicketMetadata()

const { open, toggleModalTicket, openCreateTicketModal, clearFieldError, forms, errors } = modal

const { handleNewTicket, handleChangeStatus, loading } = useTicketActions(modal, fetch)

const { statuses, priorities, assignees } = fetch

const boardStore = useSprintBoardStore()
const router = useRouter()
const { columns, ticketsByColumn, totalActiveTickets, hasActiveFilters } = storeToRefs(boardStore)

const teamMembers = [
  { name: 'Bun Tran' },
  { name: 'Tinh Tran' },
  { name: 'Thuong Nguyen' },
  { name: 'Bao Mai' },
]

onMounted(() => {
  boardStore.fetchBoardData()
})

const openTicketDetails = (id) => {
  router.push({ name: path.task.details.name, params: { id } })
}
</script>

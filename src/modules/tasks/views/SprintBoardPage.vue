<template>
  <div class="flex h-full flex-col gap-4 overflow-hidden">
    <BoardHeader
      class="shrink-0"
      :total-tickets="totalActiveTickets"
      :total-columns="columns.length"
      :team-members="teamMembers"
      @open-modal="toggleModalTicket"
    />

    <div class="flex flex-1 gap-4 overflow-x-auto overflow-y-hidden pb-2">
      <BoardColumn
        v-for="col in columns"
        :key="col.id"
        :status="col"
        :tickets="ticketsByColumn[col.statusId] || []"
        @select-ticket="getTicket"
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

const modal = useModal()

const fetch = useTicketMetadata()

const { open, toggleModalTicket, clearFieldError, forms, errors } = modal

const { handleNewTicket } = useTicketActions(modal, fetch)

const { statuses, priorities, assignees } = fetch

const boardStore = useSprintBoardStore()

const { columns, ticketsByColumn, totalActiveTickets } = storeToRefs(boardStore)

const teamMembers = [
  { name: 'Bun Tran' },
  { name: 'Tinh Tran' },
  { name: 'Thuong Nguyen' },
  { name: 'Bao Mai' },
]

onMounted(() => {
  boardStore.fetchBoardData()
})
</script>

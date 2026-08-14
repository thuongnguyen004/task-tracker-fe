<template>
  <div class="flex h-full flex-col gap-4 overflow-hidden">
    <BoardHeader
      class="shrink-0"
      :total-tickets="totalActiveTickets"
      :total-columns="columns.length"
      :team-members="assignees"
      @open-modal="openCreateTicketModal(statuses, priorities)"
    />

    <div class="flex flex-1 gap-4 overflow-x-auto overflow-y-hidden pb-2">
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
import { onMounted } from 'vue'
import { BoardHeader, BoardColumn, TicketFormModal } from '../components'
import { useSprintBoardStore } from '../stores'
import { useModal, useTicketActions, useTicketMetadata } from '../composables'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { path } from '@/shared/constants/paths'

const modal = useModal()

const fetch = useTicketMetadata()

const { open, toggleModalTicket, openCreateTicketModal, clearFieldError, forms, errors } = modal

const { handleNewTicket, handleChangeStatus, loading } = useTicketActions(modal, fetch)

const { statuses, priorities, assignees } = fetch

const boardStore = useSprintBoardStore()
const router = useRouter()
const { columns, ticketsByColumn, totalActiveTickets } = storeToRefs(boardStore)

onMounted(() => {
  boardStore.fetchBoardData()
})

const openTicketDetails = (code) => {
  router.push({ name: path.task.details.name, params: { code: code } })
}
</script>

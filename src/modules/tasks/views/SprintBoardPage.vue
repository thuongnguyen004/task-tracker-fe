<template>
  <div class="flex h-full flex-col gap-4 overflow-hidden">
    <BoardHeader
      class="shrink-0"
      :total-tickets="totalActiveTickets"
      :total-columns="columns.length"
      :team-members="teamMembers"
    />

    <div class="flex flex-1 gap-4 overflow-x-auto overflow-y-hidden pb-2">
      <BoardColumn
        v-for="col in columns"
        :key="col.id"
        :status="col"
        :tickets="ticketsByColumn[col.statusId] || []"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { BoardHeader, BoardColumn } from '../components'
import { useSprintBoardStore } from '../stores'

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

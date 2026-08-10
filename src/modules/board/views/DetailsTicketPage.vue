<template>
  <div class="grid grid-cols-[2fr_1fr] gap-6 px-6">
    <div>
      <TicketDescription :ticket="ticketById" />
      <div class="border-border flex border-b">
        <TabItem
          title="Comments"
          tab="comments"
          :count="0"
          :active-tab="activeTab"
          @change="changeTabComments"
        />
        <TabItem
          title="Activities"
          tab="activities"
          :count="ticketActivities.length"
          :active-tab="activeTab"
          @change="changeTabActivities"
        />
      </div>
      <div class="mt-6">
        <CommentList v-if="activeTab === 'comments'" />

        <ActivityList :activities="ticketActivities" v-else />
      </div>
    </div>

    <TicketSidebar @open-modal="openModalEditTicket" :ticket="ticketById" />
    <TicketFormModal
      title="Edit Ticket"
      buttonTitle="Update Ticket"
      v-model:open="open"
      v-model:forms="forms"
      :statuses="statuses"
      :priorities="priorities"
      :assignees="assignees"
      :errors="errors"
      :loading="loading"
      @close-modal="toggleModalTicket"
      @handle-ticket="handleUpdateTicket"
      @clear-error="clearFieldError"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ActivityList, CommentList, TabItem, TicketDescription, TicketSidebar } from '../components/index.js'
import TicketFormModal from '../components/TicketFormModal.vue'
import { useModal, useTicketActions, useTicketMetadata } from '../composables/index.js'

const route = useRoute()

const modal = useModal()

const { open, toggleModalTicket, openModalEditTicket, clearFieldError, forms, errors } = modal

const { handleUpdateTicket, getTicket, getTicketActivities, ticketById, ticketActivities, loading } = useTicketActions(modal)

const { statuses, priorities, assignees } = useTicketMetadata()

const activeTab = ref('comments')

const changeTabComments = (tab) => {
  activeTab.value = tab
}

const changeTabActivities = (tab) => {
  activeTab.value = tab
  getTicketActivities()
}

onMounted(() => {
  getTicket(route.params.id)
})
</script>

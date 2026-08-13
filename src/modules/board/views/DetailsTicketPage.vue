<template>
  <div class="grid h-full min-h-0 grid-cols-3 gap-6 px-6">
    <div class="col-span-2 flex min-h-0 flex-col">
      <div class="shrink-0">
        <TicketDescription :ticket="ticketById" />
      </div>
      <div class="border-border flex shrink-0 border-b">
        <TabItem
          title="Comments"
          tab="comments"
          :count="commentsCount"
          :active-tab="activeTab"
          @change="changeTab"
        />
        <TabItem
          title="Activities"
          tab="activities"
          :count="ticketActivitiesByTicket.length"
          :active-tab="activeTab"
          @change="changeTab"
        />
      </div>

      <div class="mt-6 flex min-h-0 flex-1 flex-col">
        <TransitionFadeScale>
          <div v-if="activeTab === 'comments'" key="comments" class="min-h-0 flex-1 overflow-y-auto">
            <CommentList
              :ticket-id="ticketById?.id"
              :ticketById="ticketById"
              @update:count="handleCommentCountUpdate"
            />
          </div>

          <div v-else key="activities" class="min-h-0 flex-1 overflow-y-auto">
            <ActivityList :activities="ticketActivitiesByTicket" />

            <div v-if="showLoadMoreButtonByTicket" class="mx-auto mt-2 w-fit text-xs">
              <BaseButton variant="quaternary" @click="handleLoadMoreActivityByTicket">
                Load more...
              </BaseButton>
            </div>
          </div>
        </TransitionFadeScale>
      </div>
    </div>

    <TicketSidebar
      @open-modal="openModalEditTicket"
      @archive-ticket="handleArchiveTicket"
      @restore-ticket="handleRestoreTicket"
      :ticket="ticketById"
    />
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
import { onMounted, watch } from 'vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  ActivityList,
  CommentList,
  TabItem,
  TicketDescription,
  TicketSidebar,
} from '../components/index.js'
import TicketFormModal from '../components/TicketFormModal.vue'
import {
  useModal,
  useTicketActions,
  useTicketActivity,
  useTicketMetadata,
} from '../composables/index.js'
import BaseButton from '@/shared/ui/components/BaseButton.vue'
import { TransitionFadeScale } from '@/shared/ui/components'

const route = useRoute()

const modal = useModal()

const { open, toggleModalTicket, openModalEditTicket, clearFieldError, forms, errors } = modal

const { ticketActivitiesByTicket, getTicketActivitiesByTicket, handleLoadMoreActivityByTicket, showLoadMoreButtonByTicket } =
  useTicketActivity()

const {
  handleUpdateTicket,
  getTicket,
  ticketById,
  loading,
  handleArchiveTicket,
  handleRestoreTicket,
} = useTicketActions(modal)

const { statuses, priorities, assignees } = useTicketMetadata()

const activeTab = ref('comments')
const commentsCount = ref(0)

const changeTab = (tab) => {
  activeTab.value = tab
}

const handleCommentCountUpdate = (count) => {
  commentsCount.value = count
}

onMounted(() => {
  getTicket(route.params.id)
})

watch(
  [() => commentsCount.value, () => ticketById.value?.archived, () => ticketById.value],
  () => {
    getTicketActivitiesByTicket()
  },
  { immediate: true },
)
</script>

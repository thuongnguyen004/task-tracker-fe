<template>
  <div class="h-full">
    <div v-if="loading">Loading...</div>
    <div class="grid h-full min-h-0 grid-cols-3 gap-6 px-6" v-else-if="ticketById">
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
            <div v-if="activeTab === 'comments'" key="comments" class="min-h-0 flex-1">
              <CommentList
                :ticket-id="ticketById?.id"
                :ticketById="ticketById"
                @update:count="handleCommentCountUpdate"
                @comment-changed="handleCommentChanged"
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
    </div>
    <div v-else class="text-tertiary">
      <p>Ticket not found.</p>
    </div>
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

const {
  handleUpdateTicket,
  getTicketByTicketCode,
  ticketById,
  loading,
  handleArchiveTicket,
  handleRestoreTicket,
} = useTicketActions(modal)

const {
  ticketActivitiesByTicket,
  getTicketActivitiesByTicket,
  handleLoadMoreActivityByTicket,
  showLoadMoreButtonByTicket,
} = useTicketActivity(ticketById)

const { statuses, priorities, assignees } = useTicketMetadata()

const activeTab = ref('comments')
const commentsCount = ref(0)
const commentChanged = ref(0)

const changeTab = (tab) => {
  activeTab.value = tab
}

const handleCommentCountUpdate = (count) => {
  commentsCount.value = count
}

const handleCommentChanged = () => {
  commentChanged.value += 1
}

onMounted(() => {
  getTicketByTicketCode(route.params.code)
})

watch(
  [() => commentChanged.value, () => ticketById.value?.archived, () => ticketById.value],
  () => {
    if (ticketById.value?.id) {
      getTicketActivitiesByTicket()
    }
  },
  { immediate: true },
)
</script>

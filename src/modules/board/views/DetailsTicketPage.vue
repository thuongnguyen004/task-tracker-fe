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
          :count="ticketActivities.length"
          :active-tab="activeTab"
          @change="changeTab"
        />
      </div>

      <div class="mt-6 flex min-h-0 flex-1 flex-col">
        <Transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition-all duration-200 ease-out"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
          mode="out-in"
        >
          <div v-if="activeTab === 'comments'" key="comments" class="min-h-0 flex-1">
            <CommentList :ticket-id="ticketById?.id" @update:count="handleCommentCountUpdate" />
          </div>

          <div v-else key="activities" class="min-h-0 flex-1 overflow-y-auto">
            <ActivityList :activities="ticketActivities" />

            <div v-if="showLoadMoreButton" class="mx-auto mt-2 w-fit text-xs">
              <BaseButton variant="quaternary" @click="handleLoadMoreActivity">
                Load more...
              </BaseButton>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <div class="col-span-1">
      <TicketSidebar @open-modal="openModalEditTicket" :ticket="ticketById" />
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

const route = useRoute()

const modal = useModal()

const { open, toggleModalTicket, openModalEditTicket, clearFieldError, forms, errors } = modal

const { handleUpdateTicket, getTicket, ticketById, loading } = useTicketActions(modal)

const { ticketActivities, getTicketActivities, handleLoadMoreActivity, showLoadMoreButton } =
  useTicketActivity()

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
  getTicketActivities()
})

watch(
  () => commentsCount.value,
  (countActivity) => {
    if (countActivity) {
      getTicketActivities()
    }
  },
  { immediate: true }
)
</script>

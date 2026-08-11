<template>
  <div class="border-border flex border-b">
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
      :count="activities.length"
      :active-tab="activeTab"
      @change="changeTab"
    />
  </div>

  <div class="mt-6">
    <CommentList
      v-if="activeTab === 'comments'"
      :ticket-id="ticketId"
      @update:count="handleCountUpdate"
    />

    <ActivityList v-else />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TabItem from './TabItem.vue'
import CommentList from '../comments/CommentList.vue'
import ActivityList from '../activities/ActivityList.vue'

const activeTab = ref('comments')

const commentsCount = ref(0)

defineProps({
  ticketId: {
    type: String,
    default: '',
  },
  activities: {
    type: Array,
    default: () => [],
  },
})

const changeTab = (tab) => {
  activeTab.value = tab
}

const handleCountUpdate = (count) => {
  commentsCount.value = count
}
</script>

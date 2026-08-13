<template>
  <div class="border-border flex border-b">
    <TabItem
      title="Comments"
      tab="comments"
      :count="comments.length"
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
    <CommentList v-if="activeTab === 'comments'" />

    <ActivityList v-else />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TabItem from './TabItem.vue'
import CommentList from '../comments/CommentList.vue'
import ActivityList from '../activities/ActivityList.vue'

const activeTab = ref('comments')

defineProps({
  comments: {
    type: Array,
    default: () => [],
  },
  activities: {
    type: Array,
    default: () => [],
  },
})

const changeTab = (tab) => {
  activeTab.value = tab
}
</script>

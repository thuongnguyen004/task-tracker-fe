<template>
  <p v-if="!props.activities.length" class="text-tertiary py-6 text-center text-sm italic">
    No activities yet.
  </p>

  <ActivityItem
    v-for="activity in props.activities"
    :key="activity.id"
    :activity="activity"
  />
</template>

<script setup>
import ActivityItem from './ActivityItem.vue'

const props = defineProps({
  activities: {
    type: Array,
    default: () => [],
  },
})
</script>

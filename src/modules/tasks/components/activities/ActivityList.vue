<template>
  <ActivityItem
    v-for="activity in props.activities"
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

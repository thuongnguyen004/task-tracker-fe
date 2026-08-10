<template>
  <ActivityItem
    v-for="activity in activities"
    :key="activity.id"
    :user="activity.user"
    :action="activity.action"
    :from="activity.from"
    :to="activity.to"
    :time="activity.time"
    :type="activity.type"
  />
</template>

<script setup>
import { ref } from 'vue'
import ActivityItem from './ActivityItem.vue'

const activities = ref([
  {
    id: 1,
    user: 'Alex Lee',
    action: 'added a comment',
    time: '1 hour ago',
    type: 'comment',
  },
  {
    id: 2,
    user: 'Mai Pham',
    action: 'added a comment',
    time: '2 hours ago',
    type: 'comment',
  },
  {
    id: 3,
    user: 'Alex Lee',
    action: 'changed priority from',
    from: 'Medium',
    to: 'High',
    time: '5 hours ago',
    type: 'update',
  },
  {
    id: 4,
    user: 'Alex Lee',
    action: 'changed assignee to Alex Lee',
    time: '2 days ago',
    type: 'update',
  },
  {
    id: 5,
    user: 'Tung Nguyen',
    action: 'created this ticket',
    time: '2 days ago',
    type: 'create',
  },
])
</script>

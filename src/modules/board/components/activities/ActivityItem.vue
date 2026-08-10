<template>
  <div class="border-border flex gap-4 border-b py-5">
    <span class="bg-priority-tertiary mt-2 h-2 w-2 rounded-full"></span>

    <div class="flex flex-col">
      <div class="text-sm">
        <template v-if="activity.eventCode === 'ASSIGNEE_CHANGED'">
          <span>
            {{ props.activity.performedByName }}
            {{ activity.newValue ? ' changed assignee to ' : ' removed assignee' }}
            {{ activity.newValue ?? '' }}
          </span>
        </template>

        <template v-else-if="valueComponent">
          <span>
            {{ props.activity.performedByName }}
            {{ activityLabel }}
          </span>

          <component :is="valueComponent.component" v-bind="valueComponent.oldProps" />

          <span> to </span>

          <component :is="valueComponent.component" v-bind="valueComponent.newProps" />
        </template>

        <template v-else>
          {{ activityText }}
        </template>
      </div>

      <p class="text-tertiary mt-1 text-sm">
        {{ formatRelativeTime(activity.createdAt) }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { PriorityBadge, StatusBadge } from '..'
import { formatRelativeTime } from '@/shared/utils'

const props = defineProps({
  activity: {
    type: Object,
    required: true,
  },
})

const valueComponent = computed(() => {
  const activity = props.activity

  switch (activity.eventCode) {
    case 'STATUS_CHANGED':
      return {
        component: StatusBadge,
        oldProps: {
          status: activity.oldValue,
        },
        newProps: {
          status: activity.newValue,
        },
      }

    case 'PRIORITY_CHANGED':
      return {
        component: PriorityBadge,
        oldProps: {
          priority: activity.oldValue,
        },
        newProps: {
          priority: activity.newValue,
        },
      }

    default:
      return null
  }
})

const activityLabel = computed(() => {
  switch (props.activity.eventCode) {
    case 'STATUS_CHANGED':
      return 'changed status from'

    case 'PRIORITY_CHANGED':
      return 'changed priority from'

    default:
      return ''
  }
})

const activityText = computed(() => {
  const activity = props.activity

  switch (activity.eventCode) {
    case 'TICKET_CREATED':
      return `${activity.performedByName} created this ticket`

    case 'TICKET_ARCHIVED':
      return `${activity.performedByName} archived this ticket`

    case 'TITLE_CHANGED':
      return `${activity.performedByName} changed the title`

    case 'DESCRIPTION_CHANGED':
      return `${activity.performedByName} changed the description`

    case 'COMMENT_ADDED':
      return `${activity.performedByName} added a comment`

    default:
      return activity.eventName
  }
})
</script>

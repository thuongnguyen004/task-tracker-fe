<template>
  <div class="border-border flex gap-4 border-b py-5">
    <span class="bg-priority-tertiary mt-2 h-2 w-2 rounded-full"></span>

    <div class="flex flex-col">
      <div class="text-sm">
        <template v-if="activity.eventCode === 'ASSIGNEE_CHANGED'">
          <span>
            <span class="text-primary font-semibold">{{ props.activity.performedByName }}</span>
            {{ activity.newValue ? ' changed assignee to ' : ' removed assignee' }}
            <span class="text-primary font-semibold">{{ activity.newValue ?? '' }}</span>
          </span>
        </template>

        <template v-else-if="valueComponent">
          <span>
            <span class="text-primary font-semibold">{{ props.activity.performedByName }}</span>
            <span class="text-primary">{{ activityLabel }}</span>
          </span>

          <component :is="valueComponent.component" v-bind="valueComponent.oldProps" />

          <span> to </span>

          <component :is="valueComponent.component" v-bind="valueComponent.newProps" />
        </template>

        <template v-else>
          <span class="text-primary font-semibold">{{ props.activity.performedByName }}</span>
          <span class="text-primary">{{ activityText }}</span>
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
          dot: false,
        },
        newProps: {
          status: activity.newValue,
          dot: false,
        },
      }

    case 'PRIORITY_CHANGED':
      return {
        component: PriorityBadge,
        oldProps: {
          priority: activity.oldValue,
          dot: false,
        },
        newProps: {
          priority: activity.newValue,
          dot: false,
        },
      }

    default:
      return null
  }
})

const activityLabel = computed(() => {
  switch (props.activity.eventCode) {
    case 'STATUS_CHANGED':
      return ' changed status from '

    case 'PRIORITY_CHANGED':
      return ' changed priority from '

    default:
      return ''
  }
})

const activityText = computed(() => {
  const activity = props.activity

  switch (activity.eventCode) {
    case 'TICKET_CREATED':
      return ` created this ticket`

    case 'TICKET_ARCHIVED':
      return ` archived this ticket`

    case 'TITLE_CHANGED':
      return ` changed the title`

    case 'DESCRIPTION_CHANGED':
      return ` changed the description`

    case 'COMMENT_ADDED':
      return ` added a comment`

    default:
      return activity.eventName
  }
})
</script>

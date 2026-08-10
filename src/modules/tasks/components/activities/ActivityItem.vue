<template>
  <div class="border-border flex gap-4 border-b py-5">
    <span class="bg-priority-tertiary mt-2 h-2 w-2 rounded-full"></span>

    <div>
      <!-- <p class="text-primary">
        {{ content }}
      </p> -->
      <template v-if="valueComponent">
        <span>
          {{ props.activity.performedByName }}
          {{ activityLabel }}
        </span>
        <component :is="valueComponent.component" :v-bind="valueComponent.oldProps" />
        <span> to </span>
        <component :is="valueComponent.component" :v-bind="valueComponent.newProps" />
      </template>
      <template v-else>
        {{ activityText }}
      </template>

      <p class="text-tertiary mt-1 text-sm">
        {{ formatRelativeTime(activity.createdAt) }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { formatRelativeTime } from '@/shared/utils/datePrevious'
import { computed } from 'vue'
import { PriorityBadge, StatusBadge } from '..'

const props = defineProps({
  activity: {
    type: Object,
    default: () => {},
  },
})

const valueComponent = computed(() => {
  switch (props.activity.eventCode) {
    case 'STATUS_CHANGED':
      return {
        component: StatusBadge,
        label: 'changed status from',
        oldProps: {
          status: props.activity.oldValue,
        },
        newProps: {
          status: props.activity.newValue,
        },
      }

    case 'PRIORITY_CHANGED':
      return {
        component: PriorityBadge,
        label: 'changed priority from',
        oldProps: {
          priority: props.activity.oldValue,
        },
        newProps: {
          priority: props.activity.newValue,
        },
      }

    case 'ASSIGNEE_CHANGED':
      return {
        component: AssigneeBadge,
        label: 'assigned to',
        showOld: false,
        newProps: {
          assignee: activity.newValue,
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

    case 'ASSIGNEE_CHANGED':
      return 'changed assignee'
    default:
      return null
  }
})

const activityText = computed(() => {
  const activity = props.activity

  switch (props.activity.eventCode) {
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
      return null
  }
})
</script>

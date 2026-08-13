<template>
  <div class="border-border flex min-w-0 gap-4 border-b py-5">
    <UserAvatar :name="props.activity.performedByName" />

    <div class="flex min-w-0 flex-1 flex-col">
      <div class="text-sm break-words whitespace-normal">
        <template v-if="activity.eventCode === 'ASSIGNEE_CHANGED'">
          <span>
            <span class="text-primary font-semibold">{{ props.activity.performedByName }}</span>

            {{ assigneeChangeText }}

            <span class="text-primary font-semibold">{{ activity.newValue ?? '' }}</span>
          </span>
        </template>

        <template v-else-if="activity.eventCode === 'COMMENT_ADDED'">
          <span class="text-primary font-semibold">{{ activity.performedByName }}</span>

          <span class="text-primary"> added a comment:</span>

          <ShowMoreText
            :content="activity.newValue || activity.content || '-'"
            content-class="text-primary mt-1 text-sm"
          />
        </template>

        <template v-else-if="contentChange">
          <span class="text-primary font-semibold">{{ props.activity.performedByName }}</span>

          <span class="text-primary">
            changed the {{ contentChangeLabel }}
          </span>

          <div class="text-primary mt-2 space-y-1 text-sm">
            <div>
              <span class="font-medium">From:</span>

              <ShowMoreText
                :content="contentChange.oldValue || '-'"
                content-class="text-primary"
              />
            </div>

            <div>
              <span class="font-medium">To:</span>
              <ShowMoreText
                :content="contentChange.newValue || '-'"
                content-class="text-primary"
              />
            </div>
          </div>
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
import { PriorityBadge, ShowMoreText, StatusBadge } from '..'
import { formatRelativeTime } from '@/shared/utils'
import { UserAvatar } from '@/shared/ui/components'

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
        oldProps: { status: activity.oldValue, dot: false },
        newProps: { status: activity.newValue, dot: false },
      }

    case 'PRIORITY_CHANGED':
      return {
        component: PriorityBadge,
        oldProps: { priority: activity.oldValue, dot: false },
        newProps: { priority: activity.newValue, dot: false },
      }

    default:
      return null
  }
})

const contentChange = computed(() => {
  const activity = props.activity

  if (!['TITLE_CHANGED', 'DESCRIPTION_CHANGED', 'COMMENT_CHANGED'].includes(activity.eventCode)) {
    return null
  }

  return {
    eventCode: activity.eventCode,
    oldValue: activity.oldValue,
    newValue: activity.newValue,
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

const assigneeChangeText = computed(() => {
  return props.activity.newValue ? ' changed assignee to ' : ' removed assignee'
})

const contentChangeLabel = computed(() => {
  switch (contentChange.value?.eventCode) {
    case 'TITLE_CHANGED':
      return 'title'
    case 'DESCRIPTION_CHANGED':
      return 'description'
    default:
      return 'comment'
  }
})

const activityText = computed(() => {
  const activity = props.activity

  switch (activity.eventCode) {
    case 'TICKET_CREATED':
      return ' created this ticket'

    case 'TICKET_ARCHIVED':
      return ' archived this ticket'

    default:
      return activity.eventName
  }
})
</script>

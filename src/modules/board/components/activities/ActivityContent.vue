<template>
  <div class="min-w-0 flex-1">
    <div class="text-sm break-words whitespace-normal">
      <template v-if="activity.eventCode === 'ASSIGNEE_CHANGED'">
        <span>
          <span class="text-primary font-semibold">{{ activity.performedByName }}</span>
          <template v-if="assigneeChange.isRemoved">
            <span class="text-primary"> removed assignee </span>
            <span class="text-primary font-semibold">{{ assigneeChange.oldValue }}</span>
          </template>
          <template v-else>
            <span class="text-primary"> changed assignee from </span>
            <span class="text-primary font-semibold">{{ assigneeChange.oldValue }}</span>
            <span class="text-primary"> to </span>
            <span class="text-primary font-semibold">{{ assigneeChange.newValue }}</span>
          </template>
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
        <span class="text-primary font-semibold">{{ activity.performedByName }}</span>
        <span class="text-primary"> changed the {{ contentChangeLabel }}</span>

        <div class="text-primary mt-2 space-y-1 text-sm">
          <div>
            <span class="font-medium">From:</span>
            <ShowMoreText :content="contentChange.oldValue || '-'" content-class="text-primary" />
          </div>
          <div>
            <span class="font-medium">To:</span>
            <ShowMoreText :content="contentChange.newValue || '-'" content-class="text-primary" />
          </div>
        </div>
      </template>

      <template v-else-if="valueComponent">
        <span>
          <span class="text-primary font-semibold">{{ activity.performedByName }}</span>
          <span class="text-primary">{{ activityLabel }}</span>
        </span>

        <component :is="valueComponent.component" v-bind="valueComponent.oldProps" />
        <span> to </span>
        <component :is="valueComponent.component" v-bind="valueComponent.newProps" />
      </template>

      <template v-else>
        <span class="text-primary font-semibold">{{ activity.performedByName }}</span>
        <span class="text-primary">{{ activityText }}</span>
      </template>

      <button v-if="showTicket" class="text-primary" @click="handleDetails(activity.ticketCode)">
        <span class="ml-1 inline-block">
          this ticket
          <span class="font-semibold italic underline">{{ activity.title }}</span>
        </span>
      </button>
    </div>

    <p class="text-tertiary mt-1 text-sm">
      {{ formatRelativeTime(activity.createdAt) }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import PriorityBadge from '../PriorityBadge.vue'
import StatusBadge from '../StatusBadge.vue'
import ShowMoreText from '../ShowMoreText.vue'
import { formatRelativeTime } from '@/shared/utils'
import { useRouter } from 'vue-router'
import { path } from '@/shared/constants/paths.js'

const router = useRouter()

const props = defineProps({
  activity: { type: Object, required: true },
  showTicket: { type: Boolean, default: false },
})

const activity = computed(() => props.activity)

const valueComponent = computed(() => {
  switch (activity.value.eventCode) {
    case 'STATUS_CHANGED':
      return {
        component: StatusBadge,
        oldProps: { status: activity.value.oldValue, dot: false },
        newProps: { status: activity.value.newValue, dot: false },
      }
    case 'PRIORITY_CHANGED':
      return {
        component: PriorityBadge,
        oldProps: { priority: activity.value.oldValue, dot: false },
        newProps: { priority: activity.value.newValue, dot: false },
      }
    default:
      return null
  }
})

const contentChange = computed(() => {
  if (
    !['TITLE_CHANGED', 'DESCRIPTION_CHANGED', 'COMMENT_CHANGED'].includes(activity.value.eventCode)
  ) {
    return null
  }

  return {
    eventCode: activity.value.eventCode,
    oldValue: activity.value.oldValue,
    newValue: activity.value.newValue,
  }
})

const activityLabel = computed(() => {
  switch (activity.value.eventCode) {
    case 'STATUS_CHANGED':
      return ' changed status from '
    case 'PRIORITY_CHANGED':
      return ' changed priority from '
    default:
      return ''
  }
})

const assigneeChange = computed(() => {
  const oldValue = activity.value.oldValue || 'Unassigned'
  const newValue = activity.value.newValue || 'Unassigned'

  return {
    oldValue,
    newValue,
    isRemoved: !activity.value.newValue,
  }
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
  switch (activity.value.eventCode) {
    case 'TICKET_CREATED':
      return props.showTicket ? ' created' : ' created this ticket'
    case 'TICKET_ARCHIVED':
      return props.showTicket ? ' archived' : ' archived this ticket'
    default:
      return activity.value.eventName
  }
})

const handleDetails = (code) => {
  if (!code) {
    return
  }

  router.push({
    name: path.task.details.name,
    params: {
      code,
    },
  })
}
</script>

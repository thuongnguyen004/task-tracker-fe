<template>
  <div class="max-h-list flex flex-col gap-6 overflow-y-auto p-3">
    <span v-if="!ticketActivities?.length" class="text-tertiary block py-4 text-center text-sm">
      No activities yet.
    </span>

    <button
      v-for="activity in ticketActivities"
      :key="activity.id"
      class="hover:bg-quinary flex cursor-pointer gap-2 rounded-2xl p-2 transition-all text-start"
      @click="handleDetails(activity.ticketId)"
    >
      <UserAvatar :name="activity.performedByName" />

      <div class="grid-rows-2">
        <div class="text-sm">
          <template v-if="activity.eventCode === 'ASSIGNEE_CHANGED'">
            <span>
              <span class="text-primary font-semibold">{{ activity.performedByName }}</span>

              {{ activity.newValue ? ' changed assignee to ' : ' removed assignee' }}

              <span class="text-primary font-semibold">{{ activity.newValue ?? '' }}</span>
            </span>
          </template>

          <template v-else-if="getValueComponent(activity)">
            <span>
              <span class="text-primary font-semibold">{{ activity.performedByName }}</span>

              <span class="text-primary">{{ getActivityLabel(activity) }}</span>
            </span>

            <component
              :is="getValueComponent(activity).component"
              v-bind="getValueComponent(activity).oldProps"
            />

            <span> to </span>

            <component
              :is="getValueComponent(activity).component"
              v-bind="getValueComponent(activity).newProps"
            />
          </template>

          <template v-else>
            <span class="text-primary font-semibold">{{ activity.performedByName }}</span>

            <span class="text-primary">{{ getActivityText(activity) }}</span>
          </template>

          <span class="text-primary">
            ticket

            <span class="font-semibold italic underline">{{ activity.title }}</span>
          </span>
        </div>

        <p class="text-tertiary mt-1 text-sm">
          {{ formatRelativeTime(activity.createdAt) }}
        </p>
      </div>
    </button>
    <div v-if="showLoadMoreButton" class="mx-auto mt-2 w-fit text-xs">
      <BaseButton variant="quaternary" @click="handleLoadMoreActivity"> Load more... </BaseButton>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import { PriorityBadge, StatusBadge } from '..'
import { formatRelativeTime } from '@/shared/utils'
import { BaseButton, UserAvatar } from '@/shared/ui/components'
import { useRouter } from 'vue-router'
import { path } from '@/shared/constants/paths'

const ticketActivities = inject('ticketActivities')
const showLoadMoreButton = inject('showLoadMoreButton')
const handleLoadMoreActivity = inject('handleLoadMoreActivity')

const router = useRouter()

const handleDetails = (id) => {
  router.push({
    name: path.task.details.name,
    params: {
      id,
    },
  })
}

const getValueComponent = (activity) => {
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
}

const getActivityLabel = (activity) => {
  switch (activity.eventCode) {
    case 'STATUS_CHANGED':
      return ' changed status from '
    case 'PRIORITY_CHANGED':
      return ' changed priority from '
    default:
      return ''
  }
}

const getActivityText = (activity) => {
  switch (activity.eventCode) {
    case 'TICKET_CREATED':
      return ' created this ticket'
    case 'TICKET_ARCHIVED':
      return ' archived this ticket'
    case 'TITLE_CHANGED':
      return ' changed the title'
    case 'DESCRIPTION_CHANGED':
      return ' changed the description'
    case 'COMMENT_ADDED':
      return ' added a comment'
    default:
      return activity.eventName
  }
}
</script>

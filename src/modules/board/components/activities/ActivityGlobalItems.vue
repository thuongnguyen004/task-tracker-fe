<template>
  <div class="max-h-list flex flex-col gap-6 overflow-y-auto p-3">
    <span v-if="!ticketActivities?.length" class="text-tertiary block py-4 text-center text-sm">
      No activities yet.
    </span>

    <div
      v-for="activity in ticketActivities"
      :key="activity.id"
      class="hover:bg-quinary flex min-w-0 cursor-pointer gap-2 rounded-2xl p-2 text-start transition-all"
      
    >
      <UserAvatar :name="activity.performedByName" />
      <ActivityContent :activity="activity" show-ticket />
    </div>
    <div v-if="showLoadMoreButton" class="mx-auto mt-2 w-fit text-xs">
      <BaseButton variant="quaternary" @click="handleLoadMoreActivity"> Load more... </BaseButton>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import { BaseButton, UserAvatar } from '@/shared/ui/components'
import ActivityContent from './ActivityContent.vue'

const ticketActivities = inject('ticketActivities')
const showLoadMoreButton = inject('showLoadMoreButton')
const handleLoadMoreActivity = inject('handleLoadMoreActivity')



</script>

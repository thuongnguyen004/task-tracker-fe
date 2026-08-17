<template>
  <div class="border-border flex min-w-0 gap-4 border-b py-5">
    <UserAvatar :name="props.activity.performedByName" />
    <div class="min-w-0 flex-1">
      <ActivityContent :activity="props.activity" />
    </div>
  </div>
</template>

<script setup>
import { UserAvatar } from '@/shared/ui/components'
import ActivityContent from './ActivityContent.vue'

const props = defineProps({
  activity: {
    type: Object,
    required: true,
  },
})

</script>

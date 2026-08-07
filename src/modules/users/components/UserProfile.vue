<template>
  <div class="my-8">
    <p class="text-tertiary mb-4 text-sm font-semibold">ACCOUNT INFORMATION</p>

    <div class="space-y-4">
      <div v-for="field in profileFields" :key="field.label">
        <span class="text-tertiary text-xs font-semibold uppercase">
          {{ field.label }}
        </span>

        <p class="text-primary font-medium">{{ field.value }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { convertDate } from '@/shared/utils'

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
})

const profileFields = computed(() => [
  { label: 'Username', value: props.user?.username || '-' },
  { label: 'Email', value: props.user?.email || '-' },
  { label: 'Account Created', value: convertDate(props.user?.createdAt) },
])
</script>

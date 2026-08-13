<template>
  <div class="border-border flex gap-4 border-b py-5">
    <span class="mt-2 h-2 w-2 rounded-full" :class="dotClass"></span>

    <div>
      <p class="text-primary">
        {{ user }}

        {{ action }}

        <span v-if="from" class="rounded bg-green-100 px-2 py-0.5 text-sm text-green-700">
          {{ from }}
        </span>

        <span v-if="from">to</span>

        <span v-if="to" class="rounded bg-yellow-100 px-2 py-0.5 text-sm text-yellow-700">
          {{ to }}
        </span>
      </p>

      <p class="text-tertiary mt-1 text-sm">
        {{ time }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  user: String,
  action: String,
  time: String,
  type: {
    type: String,
    default: 'default',
  },
  from: String,
  to: String,
})

const dotClass = computed(() => {
  const colors = {
    comment: 'bg-priority-primary',
    update: 'bg-priority-tertiary',
    create: 'bg-priority-quaternary',
    default: 'bg-quaternary',
  }

  return colors[props.type] || colors.default
})
</script>

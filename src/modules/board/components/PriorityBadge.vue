<template>
  <span class="inline-flex items-center gap-1.5 text-sm font-semibold">
    <span class="h-2 w-2 rounded-full" :class="badgeInfo.dotClass" v-if="props.dot" />

    <span :class="badgeInfo.textClass">{{ badgeInfo.label }}</span>
  </span>
</template>

<script setup>
import { computed } from 'vue'

const PRIORITY_CONFIG = {
  low: {
    label: 'Low',
    dotClass: 'bg-priority-primary',
    textClass: 'text-priority-primary',
  },
  medium: {
    label: 'Medium',
    dotClass: 'bg-priority-secondary',
    textClass: 'text-priority-secondary',
  },
  high: {
    label: 'High',
    dotClass: 'bg-priority-tertiary',
    textClass: 'text-priority-tertiary',
  },
  critical: {
    label: 'Critical',
    dotClass: 'bg-priority-quaternary',
    textClass: 'text-priority-quaternary',
  },
}

const ALIAS_MAP = {
  1: 'low',
  low: 'low',
  2: 'medium',
  medium: 'medium',
  3: 'high',
  high: 'high',
  4: 'critical',
  critical: 'critical',
}

const props = defineProps({
  priority: {
    type: [String, Number],
    default: 'Medium',
  },
  dot: {
    type: Boolean,
    default: true,
  },
})

const badgeInfo = computed(() => {
  const key = ALIAS_MAP[String(props.priority).toLowerCase()] || 'medium'

  return PRIORITY_CONFIG[key]
})
</script>

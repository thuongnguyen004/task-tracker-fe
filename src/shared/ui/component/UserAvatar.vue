<template>
  <span :class="avatarClasses">
    {{ abbreviationName }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'md',
  },
})

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-xl',
}

const abbreviationName = computed(() => {
  if (!props.name || !String(props.name).trim()) return 'U'

  const trimmed = String(props.name).trim()

  const words = trimmed.split(/[\s._-]+/).filter(Boolean)

  if (words.length >= 2) {
    return (words[0][0] + words[words.length - 1][0]).toUpperCase()
  }

  if (words.length === 1 && words[0].length > 0) {
    return words[0].substring(0, Math.min(2, words[0].length)).toUpperCase()
  }

  return 'U'
})

const avatarClasses = computed(() => {
  return [
    'bg-tertiary text-secondary flex items-center justify-center rounded-full font-bold select-none shrink-0',
    sizeClasses[props.size] || sizeClasses.md,
  ]
})
</script>

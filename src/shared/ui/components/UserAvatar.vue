<template>
  <span :class="avatarClasses" :style="avatarStyle">
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

const colorPalette = [
  '#00875A',
  '#0052CC',
  '#DE350B',
  '#00B8D9',
  '#6554C0',
  '#FF9900',
  '#36B37E',
  '#FF5630',
  '#5243AA',
  '#00A3BF',
]

const abbreviationName = computed(() => {
  if (!props.name || !String(props.name).trim()) return 'U'

  const words = String(props.name).trim().split(/\s+/).filter(Boolean)

  if (words.length === 1) {
    return words[0][0].toUpperCase()
  }

  return (words[0][0] + words[words.length - 1][0]).toUpperCase()
})

const getColorFromName = (name) => {
  const str = String(name).trim()

  let hash = 0

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  const index = Math.abs(hash) % colorPalette.length

  return colorPalette[index]
}

const avatarStyle = computed(() => {
  return {
    backgroundColor: getColorFromName(props.name),
    color: '#ffffff',
  }
})

const avatarClasses = computed(() => {
  return [
    'flex items-center justify-center rounded-full aspect-square font-bold select-none shrink-0 shadow-xs',
    sizeClasses[props.size] || sizeClasses.md,
  ]
})
</script>

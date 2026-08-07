<template>
  <button
    class="relative px-4 py-3 text-sm font-medium"
    @click="$emit('change', props.tab)"
    :class="buttonClass"
  >
    {{ title }}
    <span class="bg-quinary text-tertiary ml-1 rounded-full px-2 py-0.5 text-xs">
      {{ count }}
    </span>

    <span v-if="isActive" class="bg-primary absolute bottom-0 left-0 h-0.5 w-full" />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  tab: {
    type: String,
    required: true,
  },
  activeTab: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
})

const isActive = computed(() => {
  return props.activeTab === props.tab
})

const buttonClass = computed(() => {
  return isActive.value ? 'text-primary' : 'text-tertiary hover:text-primary'
})

defineEmits(['change'])
</script>

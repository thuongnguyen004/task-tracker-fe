<template>
  <div>
    <p :class="['wrap-anywhere whitespace-pre-line', contentClass]">
      {{ displayedContent }}
    </p>

    <button
      v-if="shouldShowToggle"
      type="button"
      class="text-tertiary hover:text-primary mt-1 cursor-pointer text-xs font-medium transition-colors"
      @click="toggle"
    >
      {{ isExpanded ? 'Show less' : 'Show more' }}
    </button>
  </div>
</template>

<script setup>
import { toRef } from 'vue'
import { useShowMore } from '../composables/useShowMore'

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  maxLength: {
    type: Number,
    default: 300,
  },
  contentClass: {
    type: String,
    default: '',
  },
})

const content = toRef(props, 'content')

const { isExpanded, shouldShowToggle, displayedContent, toggle } = useShowMore(
  content,
  props.maxLength,
)
</script>

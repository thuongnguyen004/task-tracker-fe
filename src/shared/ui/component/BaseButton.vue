<template>
  <button :disabled="disabled" :class="buttonClasses">
    <LoaderCircle :class="checkLoading" v-if="disabled" />
    <slot />
  </button>
</template>

<script setup>
import { LoaderCircle } from '@lucide/vue'
import { computed } from 'vue'

const props = defineProps({
  disabled: { type: Boolean, default: false },
  default: false,
  variant: {
    type: String,
    default: 'primary',
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const variantClass = {
  primary: 'bg-primary text-secondary border border-transparent py-2 px-6',
  secondary: 'bg-secondary text-tertiary border-2 border-border py-2 px-6',
  tertiary: 'bg-secondary text-red-400 border-2 border-border py-2 px-6',
  quaternary: 'bg-quinary text-tertiary border-2 border-border py-2 px-6',
  transparent: 'bg-transparent border-none hover:bg-quinary px-2 py-2'
}

const buttonClasses = computed(() => {
  return [
    'flex gap-2 items-center justify-center transition-transform duration-200 font-medium text-md rounded-xl hover:scale-95 active:scale-75 disabled:bg-gray-300 w-full',
    variantClass[props.variant],
    props.disabled && 'opacity-50 cursor-not-allowed',
  ]
})

const checkLoading = computed(() => {
    return props.loading ? 'animate-spin' : '';
})
</script>

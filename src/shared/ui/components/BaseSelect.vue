<template>
  <div class="relative">
    <button type="button" :class="triggerClasses" :disabled="props.disabled" @click="toggleOpen">
      <span :class="selectedLabelClasses">
        <slot name="trigger" :selected-option="selectedOption">
          {{ selectedLabel }}
        </slot>
      </span>

      <span :class="arrowClasses">▼</span>
    </button>

    <div
      v-if="isOpen"
      class="bg-card border-border absolute z-10 mt-1 max-h-30 w-full overflow-y-auto rounded-xl border shadow-lg"
    >
      <div
        v-if="placeholder && isEmpty(model)"
        class="text-muted cursor-not-allowed px-3 py-2 text-sm opacity-60"
      >
        {{ placeholder }}
      </div>

      <div v-if="hasNoneOption" :class="getOptionClasses(null)" @click="selectValue(null)">
        <slot name="option" :option="{ value: null, label: noneOptionLabel }">
          {{ noneOptionLabel }}
        </slot>
      </div>

      <div
        v-for="option in props.options"
        :key="option.value"
        :class="getOptionClasses(option.value)"
        @click="selectValue(option.value)"
      >
        <slot name="option" :option="option">
          {{ option.label || option.name || option.username || option.value }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const model = defineModel({
  type: null,
  default: '',
})

const emit = defineEmits(['change'])

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: '',
  },
  hasNoneOption: {
    type: Boolean,
    default: false,
  },
  noneOptionLabel: {
    type: String,
    default: 'None',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const isOpen = ref(false)

const isEmpty = (value) => value === null || value === undefined || value === ''

const triggerClasses = computed(() => {
  return {
    'border-border text-primary text-md bg-input flex w-full items-center justify-between rounded-xl border-2 px-3 py-2 outline-none': true,
    'cursor-not-allowed opacity-50': props.disabled,
    'cursor-pointer': !props.disabled,
  }
})

const selectedLabelClasses = computed(() => {
  return {
    'text-tertiary-light': isEmpty(model.value),
    'text-primary font-medium': !isEmpty(model.value),
  }
})

const arrowClasses = computed(() => {
  return {
    'text-tertiary text-sm transition-transform duration-200': true,
    'rotate-180': isOpen.value,
  }
})

const baseOptionClasses = [
  'text-primary',
  'hover:bg-quinary',
  'border-border',
  'cursor-pointer',
  'border-b',
  'px-3',
  'py-3',
  'transition-colors',
  'last:border-b-0',
]

const getOptionClasses = (value) => {
  return [baseOptionClasses, model.value === value ? 'bg-quinary' : '']
}

const selectedOption = computed(() => {
  if (isEmpty(model.value)) {
    return null
  }

  return props.options.find((item) => item.value === model.value) || null
})

const selectedLabel = computed(() => {
  if (isEmpty(model.value)) {
    return props.placeholder || 'Select...'
  }

  return (
    selectedOption.value?.label ||
    selectedOption.value?.name ||
    selectedOption.value?.username ||
    model.value
  )
})

const toggleOpen = () => {
  if (props.disabled) {
    return
  }

  isOpen.value = !isOpen.value
}

const selectValue = (value) => {
  model.value = value
  isOpen.value = false
  emit('change', value)
}
</script>

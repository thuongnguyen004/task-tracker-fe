<template>
  <select
    v-model="model"
    @change="emit('change', $event)"
    class="border-border text-md bg-input cursor-pointer rounded-xl border-2 px-3 py-2 outline-none disabled:opacity-50"
  >
    <option v-if="placeholder" value="" disabled>
      {{ props.placeholder }}
    </option>

    <option v-if="props.hasNoneOption" :value="null">{{ props.noneOptionLabel }}</option>

    <option v-for="option in props.options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<script setup>
const model = defineModel({
  type: [String, Number],
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
})
</script>

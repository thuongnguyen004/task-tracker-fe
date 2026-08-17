<template>
  <textarea
    v-model="model"
    v-bind="$attrs"
    @input="emit('input', $event)"
    @focus="emit('focus', $event)"
    class="border-border text-md bg-input w-full rounded-xl border-2 px-3 py-2"
  />
</template>

<script setup>
defineOptions({
  inheritAttrs: false,
})

const model = defineModel({
  type: [String, Number],
  default: '',
})

const emit = defineEmits(['input', 'focus'])
</script>

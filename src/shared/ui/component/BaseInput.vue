<template>
  <input
    v-model="model"
    @input="emit('input', $event)"
    class="border-border text-md bg-input w-full rounded-xl border-2 px-3 py-2"
  />
</template>

<script setup>
const model = defineModel({
  type: [String, Number],
  default: '',
})
const emit = defineEmits(['input'])
</script>

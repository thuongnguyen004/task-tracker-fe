<template>
  <input
    v-model="model"
    class="py-2 px-3 rounded-xl border-2 border-border text-md bg-input w-full"
  />
</template>

<script setup>
const model = defineModel({
  type: [String, Number],
  default: '',
})

</script>

<template>
  <select
    v-model="model"
    class="py-2 px-3 rounded-xl border-2 border-border outline-none text-md bg-input cursor-pointer"
  >
    <option
      v-if="placeholder"
      value=""
      disabled
    >
      {{ props.placeholder }}
    </option>

    <option
      v-for="option in props.options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script setup>

const model = defineModel({
  type: [String, Number],
  default: '',
})
const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: "",
  },
});
</script>

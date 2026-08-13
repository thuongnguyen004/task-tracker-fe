<template>
  <div class="flex shrink-0 items-center justify-between px-4 py-4">
    <BaseButton
      variant="transparent"
      class="hover:bg-quinary h-7! w-7! p-0!"
      @click="$emit('header-action', 'back')"
    >
      <ArrowLeft :size="20" />
    </BaseButton>

    <h2 class="text-lg font-semibold text-gray-600">{{ props.title }}</h2>

    <BaseButton
      variant="transparent"
      class="hover:bg-quinary h-7! w-7! p-0!"
      @click="$emit('header-action', 'close')"
    >
      <X :size="20" />
    </BaseButton>
  </div>
</template>

<script setup>
import BaseButton from '@/shared/ui/components/BaseButton.vue'
import { ArrowLeft, X } from '@lucide/vue'

const props = defineProps({
    title: {
        type: String,
        default: ""
    }
})

defineEmits(['header-action'])
</script>

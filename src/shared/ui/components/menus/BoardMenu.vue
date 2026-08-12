<template>
  <div
    class="bg-secondary w-72 shrink-0 space-y-3 rounded-xl px-4 py-4 shadow-xl ring-1 ring-black/5"
  >
    <div class="relative flex items-center justify-center px-4 py-3">
      <h2 class="text-lg font-semibold text-gray-600">Board Menu</h2>

      <BaseButton
        variant="transparent"
        class="hover:bg-quinary absolute right-2 h-7! w-7! p-0!"
        @click="$emit('close-archive-board')"
      >
        <X :size="20" />
      </BaseButton>
    </div>
    <div class="border-border border-b"></div>

    <div class="relative">
      <button
        class="hover:bg-quinary mt-1 flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition"
        @click="$emit('open-archive')"
      >
        <span>Archive items</span>

        <Archive :size="16" class="text-tertiary" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { Archive, X } from '@lucide/vue'
import Dialog from '../dialog/Dialog.vue'
import DialogHeader from '../dialog/DialogHeader.vue'
import BaseButton from '../BaseButton.vue'

defineEmits(['open-archive', 'close-archive-board'])
</script>

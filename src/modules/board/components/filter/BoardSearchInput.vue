<template>
  <div class="relative min-w-48 flex-1 sm:w-64 sm:flex-none">
    <Search class="text-quaternary absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
    <input
      v-model="boardStore.search"
      type="text"
      placeholder="Search tickets..."
      class="border-border bg-secondary text-primary placeholder-quaternary focus:border-blue focus:ring-blue h-9 w-full rounded-lg border pr-8 pl-9 text-xs transition-colors focus:ring-1 focus:outline-none"
    />
    <button
      v-if="boardStore.search"
      type="button"
      @click="boardStore.search = ''"
      class="text-quaternary hover:text-tertiary absolute top-1/2 right-2.5 -translate-y-1/2"
      title="Clear search"
    >
      <X class="h-3.5 w-3.5" />
    </button>
  </div>
</template>

<script setup>
import { Search, X } from '@lucide/vue'
import { useSprintBoardStore } from '../../stores'

const boardStore = useSprintBoardStore()
</script>

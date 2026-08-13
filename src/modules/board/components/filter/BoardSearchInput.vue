<template>
  <div class="relative min-w-48 flex-1 sm:w-64 sm:flex-none">
    <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-quaternary" />
    <input
      v-model="boardStore.search"
      type="text"
      placeholder="Search tickets..."
      class="h-9 w-full rounded-lg border border-border bg-secondary pl-9 pr-8 text-xs text-primary placeholder-quaternary transition-colors focus:border-blue focus:outline-none focus:ring-1 focus:ring-blue"
    />
    <button
      v-if="boardStore.search"
      type="button"
      @click="boardStore.search = ''"
      class="absolute right-2.5 top-1/2 -translate-y-1/2 text-quaternary hover:text-tertiary"
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

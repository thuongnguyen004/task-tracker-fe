<template>
  <div class="relative" ref="popoverRef">
    <BaseButton
      variant="secondary"
      class="text-primary h-9! w-auto! px-3.5 py-0! text-xs font-semibold whitespace-nowrap transition-colors"
      :class="
        boardStore.activeFiltersCount > 0
          ? 'border-blue bg-blue-subtle text-blue-foreground font-bold'
          : ''
      "
      @click="togglePopover"
    >
      <SlidersHorizontal
        class="h-4 w-4"
        :class="boardStore.activeFiltersCount > 0 ? 'text-blue' : 'text-tertiary'"
      />
      Filters
      <span
        v-if="boardStore.activeFiltersCount > 0"
        class="bg-blue text-secondary ml-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold"
      >
        {{ boardStore.activeFiltersCount }}
      </span>
    </BaseButton>

    <Transition
      enter-active-class="transition-all duration-150 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition-all duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="border-border bg-secondary absolute top-11 right-0 z-30 w-80 origin-top-right rounded-xl border p-4 shadow-xl"
      >
        <BoardFilterPanel :assignees="props.assignees" />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { SlidersHorizontal } from '@lucide/vue'
import { BaseButton } from '@/shared/ui/components'
import { useSprintBoardStore } from '../../stores'
import BoardFilterPanel from './BoardFilterPanel.vue'

const props = defineProps({
  assignees: {
    type: Array,
    default: () => [],
  },
})

const boardStore = useSprintBoardStore()
const isOpen = ref(false)
const popoverRef = ref(null)

const togglePopover = () => {
  isOpen.value = !isOpen.value
}

const handleClickOutside = (event) => {
  if (popoverRef.value && !popoverRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

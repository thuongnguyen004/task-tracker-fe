<template>
  <div class="flex items-center gap-2 text-sm">
    <template v-for="(item, index) in breadcrumbs" :key="item.name">
      <span v-if="index > 0" class="text-tertiary">/</span>

      <RouterLink
        v-if="index < breadcrumbs.length - 1"
        :to="{ name: item.name }"
        class="text-tertiary hover:text-primary"
      >
        {{ item.label }}
      </RouterLink>

      <span v-else class="text-primary font-medium">
        {{ item.label }}
      </span>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { path } from '@/shared/constants/paths.js'

const route = useRoute()

const breadcrumbs = computed(() => {
  switch (route.name) {
    case path.task.board.name:
      return [
        {
          name: path.task.board.name,
          label: 'Sprint Board',
        },
      ]

    case path.task.details.name:
      return [
        {
          name: path.task.board.name,
          label: 'Sprint Board',
        },
        {
          name: path.task.details.name,
          label: 'Ticket Details',
        },
      ]

    default:
      return []
  }
})
</script>

<template>
  <Dialog v-model="open" size="full" class="overflow-hidden!">
    <!-- Header -->
    <DialogHeader class="px-5 py-3">
      <div class="flex w-full items-center justify-between">
        <h2>Ticket - {{ archiveById.id }}</h2>
      </div>
    </DialogHeader>

    <!-- Archived banner -->
    <!-- <div class="flex items-center justify-center gap-3 bg-gray-200 px-5 py-5 text-gray-700">
      <Archive :size="24" />

      <span class="text-lg">
        This card was archived on
        <span class="font-medium">
          {{ archiveById.createdAt }}
        </span>
      </span>
    </div> -->

    <!-- Main content -->
    <DialogContent class="p-0!">
      <div class="grid grid-cols-2">
        <!-- Left -->
        <div class="border-border border-r px-8 py-8">
          <!-- Title -->

          <h1 class="text-3xl font-semibold text-gray-800">
            {{ archiveById.title }}
          </h1>

          <!-- Description -->
          <div class="mt-6 mb-3 space-y-3">
            <div class="flex items-center gap-3">
              <AlignLeft :size="22" />

              <h2 class="text-lg font-semibold text-gray-800">Description</h2>
            </div>

            <BaseTexarea v-model="description" placeholder="Add a more detailed description..." />
          </div>
        </div>

        <!-- Right -->
        <div class="bg-gray-100 px-5 py-6">
          <!-- Activity header -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <MessageSquare :size="22" />

              <h2 class="text-lg font-semibold text-gray-800">Comments and activity</h2>
            </div>

            <BaseButton
              variant="secondary"
              class="h-9! w-auto! font-semibold whitespace-nowrap text-gray-700"
            >
              Show details
            </BaseButton>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import {
  AlignLeft,
  Archive,
  ChevronDown,
  Image,
  MessageSquare,
  MoreHorizontal,
  X,
} from '@lucide/vue'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/shared/ui/components'
import BaseButton from '@/shared/ui/components/BaseButton.vue'
import BaseTexarea from '@/shared/ui/components/BaseTexarea.vue'
import { useTicketActions } from '../../composables'
import { useRoute } from 'vue-router'

const open = defineModel({
  default: false,
})

const props = defineProps({
  item: {
    type: Object,
    default: null,
  },
})

const { getArchiveById, archiveById } = useTicketActions()

watch(
  () => props.item?.id,
  (id) => {
    if (id) {
      getArchiveById(id)
    }
  },
  { immediate: true },
)
</script>

<template>
  <Dialog v-model="open">
    <DialogHeader>
      <h2 class="text-2xl">{{ props.title }}</h2>
    </DialogHeader>
    <DialogContent>
      <div class="space-y-4">
        <div class="flex flex-col gap-1">
          <BaseLabel for="title">Title</BaseLabel>
          <BaseInput id="title" placeholder="Enter ticket title" />
        </div>
        <div class="flex flex-col gap-1">
          <BaseLabel for="description">Description</BaseLabel>
          <BaseTexarea id="description" placeholder="Add a description (optional)" rows="3" />
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div class="flex flex-col gap-1">
            <BaseLabel for="priority">Priority</BaseLabel>
            <BaseSelect id="priority" placeholder="Select Status" />
          </div>
          <div class="flex flex-col gap-1">
            <BaseLabel for="status">Status</BaseLabel>
            <BaseSelect id="status" placeholder="Select Status" />
          </div>
        </div>
        <div class="flex flex-col gap-1">
          <BaseLabel for="description">Assignee</BaseLabel>
          <BaseSelect placeholder="Select Assignee" />
        </div>
      </div>
    </DialogContent>
    <DialogFooter>
      <BaseButton @click="emit('close-modal')" variant="secondary">Cancel</BaseButton>
      <BaseButton variant="primary">Create Ticket</BaseButton>
    </DialogFooter>
  </Dialog>
</template>

<script setup>
import {
  BaseButton,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/shared/ui/component'
import BaseInput from '@/shared/ui/component/BaseInput.vue'
import BaseLabel from '@/shared/ui/component/BaseLabel.vue'
import BaseSelect from '@/shared/ui/component/BaseSelect.vue'
import BaseTexarea from '@/shared/ui/component/BaseTexarea.vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
})

const open = defineModel('open', {
  type: Boolean,
  default: false,
})
const forms = defineModel('forms', {
  type: Object,
  default: () => {},
})

const emit = defineEmits(['close-modal'])
</script>

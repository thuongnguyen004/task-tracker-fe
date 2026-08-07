<template>
  <Dialog v-model="open">
    <DialogHeader>
      <h2 class="text-2xl">{{ props.title }}</h2>
    </DialogHeader>

    <form @submit.prevent="emit('handle-ticket')">
      <DialogContent>
        <div class="space-y-4">
          <div class="flex flex-col gap-1">
            <BaseLabel for="title">Title <span class="text-danger">*</span></BaseLabel>

            <BaseInput id="title" v-model="forms.title" placeholder="Enter ticket title"
              @input="emit('clear-error', 'title')" />

            <span v-if="props.errors" class="text-danger text-xs leading-5 tracking-normal">{{
              props.errors.title
            }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <BaseLabel for="description">Description</BaseLabel>

            <BaseTexarea id="description" v-model="forms.description" placeholder="Add a description (optional)"
              rows="3" @input="emit('clear-error', 'description')" />

            <span v-if="props.errors" class="text-danger text-xs leading-5 tracking-normal">{{
              props.errors.description
            }}</span>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div class="flex flex-col gap-1">
              <BaseLabel for="priority">Priority</BaseLabel>

              <BaseSelect id="priority" v-model="forms.priorityId" placeholder="Select Priority" :options="priorities"
                @change="emit('clear-error', 'priorityId')" />

              <span v-if="props.errors" class="text-danger text-xs leading-5 tracking-normal">{{
                props.errors.priorityId
              }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <BaseLabel for="status">Status</BaseLabel>

              <BaseSelect id="status" v-model="forms.statusId" placeholder="Select Status" :options="statuses"
                @change="emit('clear-error', 'statusId')" />

              <span v-if="props.errors" class="text-danger text-xs leading-5 tracking-normal">{{
                props.errors.statusId
              }}</span>
            </div>
          </div>
          <div class="flex flex-col gap-1">
            <BaseLabel for="assignee">Assignee</BaseLabel>

            <BaseSelect id="assignee" v-model="forms.assigneeId" placeholder="Select Assignee" :options="assignees"
              @change="emit('clear-error', 'assigneeId')" />

            <span v-if="props.errors" class="text-danger text-xs leading-5 tracking-normal">{{
              props.errors.assigneeId
            }}</span>
          </div>
        </div>
      </DialogContent>

      <DialogFooter>
        <BaseButton @click="emit('close-modal')" variant="secondary" type="button">Cancel</BaseButton>

        <BaseButton variant="primary">{{ props.buttonTitle }}</BaseButton>
      </DialogFooter>
    </form>
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
  statuses: {
    type: Array,
    default: () => [],
  },
  priorities: {
    type: Array,
    default: () => [],
  },
  assignees: {
    type: Array,
    default: () => [],
  },
  errors: {
    type: Object,
    default: () => { },
  },
  buttonTitle: {
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
  default: () => { },
})

const emit = defineEmits(['close-modal', 'handle-ticket', 'clear-error'])
</script>

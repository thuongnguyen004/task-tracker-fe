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

            <BaseInput
              id="title"
              v-model="forms.title"
              placeholder="Enter ticket title"
              @input="emit('clear-error', 'title')"
            />

            <span v-if="props.errors" class="text-danger text-xs leading-5 tracking-normal">{{
              props.errors.title
            }}</span>
          </div>

          <div class="flex flex-col gap-1">
            <BaseLabel for="description">Description</BaseLabel>

            <BaseTexarea
              id="description"
              v-model="forms.description"
              placeholder="Add a description (optional)"
              rows="3"
              @input="emit('clear-error', 'description')"
            />

            <span v-if="props.errors" class="text-danger text-xs leading-5 tracking-normal"
              >{{ props.errors.description }}
            </span>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div class="flex flex-col gap-1">
              <BaseLabel for="priority">Priority</BaseLabel>

              <BaseSelect
                id="priority"
                v-model="forms.priorityId"
                placeholder="Select Priority"
                :options="priorities"
                @change="emit('clear-error', 'priorityId')"
              >
                <template #trigger="{ selectedOption }">
                  <PriorityBadge v-if="selectedOption" :priority="selectedOption.label" />

                  <span v-else class="text-muted">Select Priority</span>
                </template>

                <template #option="{ option }">
                  <PriorityBadge :priority="option.label" />
                </template>
              </BaseSelect>

              <span v-if="props.errors" class="text-danger text-xs leading-5 tracking-normal"
                >{{ props.errors.priorityId }}
              </span>
            </div>

            <div class="flex flex-col gap-1">
              <BaseLabel for="status">Status</BaseLabel>

              <BaseSelect
                id="status"
                v-model="forms.statusId"
                placeholder="Select Status"
                :options="statuses"
                :disabled="props.disableStatus"
                @change="emit('clear-error', 'statusId')"
              />

              <span v-if="props.errors" class="text-danger text-xs leading-5 tracking-normal"
                >{{ props.errors.statusId }}
              </span>
            </div>
          </div>

          <div class="flex flex-col gap-1">
            <BaseLabel for="assignee">Assignee</BaseLabel>

            <BaseSelect
              id="assignee"
              v-model="forms.assigneeId"
              :placeholder="assigneePlaceholder"
              has-none-option
              none-option-label="Unassigned"
              :options="assignees"
              @change="emit('clear-error', 'assigneeId')"
            />

            <span v-if="props.errors" class="text-danger text-xs leading-5 tracking-normal"
              >{{ props.errors.assigneeId }}
            </span>
          </div>
        </div>
      </DialogContent>

      <DialogFooter>
        <BaseButton @click="emit('close-modal')" variant="secondary" type="button"
          >Cancel
        </BaseButton>

        <BaseButton :disabled="loading" variant="primary">{{ props.buttonTitle }}</BaseButton>
      </DialogFooter>
    </form>
  </Dialog>
</template>

<script setup>
import { computed } from 'vue'
import {
  BaseButton,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/shared/ui/components/index.js'
import BaseInput from '@/shared/ui/components/BaseInput.vue'
import BaseLabel from '@/shared/ui/components/BaseLabel.vue'
import BaseSelect from '@/shared/ui/components/BaseSelect.vue'
import BaseTexarea from '@/shared/ui/components/BaseTexarea.vue'
import PriorityBadge from './PriorityBadge.vue'

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
    default: () => {},
  },
  buttonTitle: {
    type: String,
    default: '',
  },
  disableStatus: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
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

const assigneePlaceholder = computed(() => {
  return props.title === 'Edit Ticket' ? 'Unassigned' : 'Select Assignee'
})

const emit = defineEmits(['close-modal', 'handle-ticket', 'clear-error'])
</script>

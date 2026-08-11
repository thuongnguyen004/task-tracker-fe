<template>
  <Dialog v-model="open" size="sm">
    <DialogHeader>
      <h2 class="text-primary text-xl font-bold">{{ title }}</h2>
    </DialogHeader>

    <DialogContent>
      <p class="text-tertiary py-2 text-sm leading-relaxed">
        {{ message }}
      </p>
    </DialogContent>

    <DialogFooter class="justify-end gap-2">
      <BaseButton
        variant="secondary"
        class="w-auto! px-4! py-1.5! text-sm!"
        :disabled="loading"
        @click="handleCancel"
      >
        {{ cancelText }}
      </BaseButton>

      <BaseButton
        :variant="confirmVariant"
        class="w-auto! px-4! py-1.5! text-sm!"
        :disabled="loading"
        @click="handleConfirm"
      >
        {{ confirmText }}
      </BaseButton>
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
} from '@/shared/ui/components'

const open = defineModel('open', {
  type: Boolean,
  default: false,
})

defineProps({
  title: {
    type: String,
    default: 'Confirm Action',
  },
  message: {
    type: String,
    default: 'Are you sure you want to proceed?',
  },
  confirmText: {
    type: String,
    default: 'Confirm',
  },
  cancelText: {
    type: String,
    default: 'Cancel',
  },
  confirmVariant: {
    type: String,
    default: 'tertiary',
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['confirm', 'cancel'])

const handleCancel = () => {
  open.value = false
  emit('cancel')
}

const handleConfirm = () => {
  emit('confirm')
}
</script>

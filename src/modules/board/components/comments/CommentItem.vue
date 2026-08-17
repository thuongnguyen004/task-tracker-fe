<template>
  <div class="border-border flex gap-3 border-b py-2.5">
    <UserAvatar :name="author" />

    <div class="min-w-0 flex-1 space-y-1">
      <div class="flex items-center justify-between text-sm">
        <div class="flex items-center gap-2">
          <span class="text-primary font-bold">
            {{ author }}
          </span>

          <span class="text-tertiary-light text-xs">
            {{ time }}
          </span>

          <span
            v-if="edited"
            class="bg-quinary text-tertiary-light rounded px-1.5 py-0.5 text-[11px] font-normal"
          >
            Edited
          </span>
        </div>

        <div v-if="isOwnComment && !isEditing && !ticketArchived" class="flex items-center gap-3 text-xs">
          <button
            class="text-tertiary hover:text-primary cursor-pointer font-medium transition-colors"
            @click="startEdit"
          >
            Edit
          </button>

          <button
            class="cursor-pointer font-medium text-red-400 transition-colors hover:text-red-600"
            @click="handleDelete"
          >
            Delete
          </button>
        </div>
      </div>

      <div v-if="isEditing" class="space-y-2 pt-1">
        <BaseTextarea v-model="editContent" rows="2" class="w-full text-sm" />

        <span v-if="isEditOverLimit" class="text-danger block text-xs leading-5 tracking-normal">
          Comment must be under 2,000 characters
        </span>

        <div class="flex justify-end gap-2">
          <BaseButton variant="secondary" class="w-auto! px-3! py-1! text-xs!" @click="cancelEdit">
            Discard Changes
          </BaseButton>

          <BaseButton
            variant="primary"
            class="w-auto! px-3! py-1! text-xs!"
            :disabled="!canSave"
            @click="saveEdit"
          >
            Save
          </BaseButton>
        </div>
      </div>

      <ShowMoreText
        v-else
        :content="content"
        :max-length="300"
        content-class="text-primary text-sm leading-relaxed"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { BaseButton, BaseTextarea, UserAvatar } from '@/shared/ui/components'
import { useAuthStore } from '@/stores'
import ShowMoreText from '../ShowMoreText.vue'

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdById: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  edited: {
    type: Boolean,
    default: false,
  },
  ticketArchived: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update', 'delete'])

const authStore = useAuthStore()

const isEditing = ref(false)

const editContent = ref(props.content)

const trimmedEditContent = computed(() => {
  return editContent.value.trim()
})

const isOwnComment = computed(() => {
  return props.createdById === authStore.currentUser?.id
})

const isEditOverLimit = computed(() => {
  return editContent.value.length > 2000
})

const canSave = computed(() => {
  return (
    trimmedEditContent.value && trimmedEditContent.value !== props.content && !isEditOverLimit.value
  )
})

const startEdit = () => {
  editContent.value = props.content

  isEditing.value = true
}

const cancelEdit = () => {
  editContent.value = props.content

  isEditing.value = false
}

const saveEdit = () => {
  if (!canSave.value) return

  emit('update', props.id, trimmedEditContent.value)

  isEditing.value = false
}

const handleDelete = () => {
  emit('delete', props.id)
}
</script>

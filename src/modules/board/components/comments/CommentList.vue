<template>
  <div class="space-y-6">
    <div class="flex gap-3" v-if="!ticketByCode.archived">
      <UserAvatar :name="currentUser?.fullName" />

      <div class="flex-1 space-y-3">
        <BaseTextarea
          v-model="newCommentText"
          placeholder="Write a comment..."
          class="w-full resize-none text-sm"
          :rows="isExpanded ? 3 : 1"
          @focus="isExpanded = true"
        />

        <span v-if="isOverLimit" class="text-danger block text-xs leading-5 tracking-normal">
          Comment must be under 2,000 characters
        </span>

        <div v-if="isExpanded" class="flex justify-end gap-2">
          <BaseButton
            variant="secondary"
            class="w-auto! px-3! py-1! text-xs!"
            :disabled="isSubmitting"
            @click="handleDiscard"
          >
            Discard
          </BaseButton>

          <BaseButton
            variant="primary"
            class="w-auto! px-3! py-1! text-xs!"
            :disabled="isSubmitting || !canSubmit"
            :loading="isSubmitting"
            @click="handleSubmit"
          >
            Save
          </BaseButton>
        </div>
      </div>
    </div>

    <div v-if="loading" class="text-tertiary py-6 text-center text-sm">Loading comments...</div>

    <div v-else-if="comments.length > 0">
      <CommentItem
        v-for="comment in comments"
        :key="comment.id"
        :id="comment.id"
        :author="comment.author"
        :created-by-id="comment.createdById"
        :content="comment.content"
        :time="formatRelativeTime(comment.updatedAt)"
        :edited="comment.edited"
        :ticketArchived="ticketByCode.archived"
        @update="handleCommentUpdate"
        @delete="openDeleteConfirmModal"
      />
    </div>

    <div v-else class="text-tertiary py-6 text-center text-sm italic">
      No comments yet. Be the first to comment!
    </div>

    <ConfirmModal
      v-model:open="isConfirmModalOpen"
      title="Delete Comment"
      message="Are you sure you want to delete this comment? This action cannot be undone."
      confirm-text="Delete"
      cancel-text="Cancel"
      confirm-variant="tertiary"
      :loading="isSubmitting"
      @confirm="confirmDeleteComment"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, toRef } from 'vue'
import CommentItem from './CommentItem.vue'
import { BaseButton, BaseTextarea, UserAvatar, ConfirmModal } from '@/shared/ui/components'
import { formatRelativeTime } from '@/shared/utils'
import { useAuthStore } from '@/stores'
import { useComments } from '../../composables'

const props = defineProps({
  ticketId: {
    type: [String, Number],
    default: '',
  },
  ticketByCode: {
    type: Object,
    default: () => {}
  }
})

const emit = defineEmits(['update:count', 'comment-changed'])

const ticketId = toRef(props, 'ticketId')

const authStore = useAuthStore()
const currentUser = authStore.currentUser

const isExpanded = ref(false)
const isConfirmModalOpen = ref(false)
const commentToDeleteId = ref(null)

const {
  comments,
  loading,
  isSubmitting,
  newCommentText,
  fetchComments,
  handleAddComment,
  handleUpdateComment,
  handleDeleteComment,
} = useComments(ticketId)

const isOverLimit = computed(() => {
  return newCommentText.value.length > 2000
})

const canSubmit = computed(() => {
  return newCommentText.value.trim() && !isOverLimit.value
})

const handleSubmit = async () => {
  const success = await handleAddComment()

  emit('comment-changed')

  if (success) {
    isExpanded.value = false
  }
}

const handleCommentUpdate = async (commentId, newContent) => {
  await handleUpdateComment(commentId, newContent)
  emit('comment-changed')
}

const handleDiscard = () => {
  newCommentText.value = ''
  isExpanded.value = false
}

const openDeleteConfirmModal = (commentId) => {
  commentToDeleteId.value = commentId
  isConfirmModalOpen.value = true
}

const confirmDeleteComment = async () => {
  if (!commentToDeleteId.value) return

  await handleDeleteComment(commentToDeleteId.value)

  if (!isSubmitting.value) {
    isConfirmModalOpen.value = false
    commentToDeleteId.value = null
  }
}

watch(
  () => comments.value.length,

  (count) => {
    emit('update:count', count)
  },
)

watch(
  ticketId,

  (id) => {
    if (id) {
      fetchComments()
    }
  },

  { immediate: true },
)
</script>

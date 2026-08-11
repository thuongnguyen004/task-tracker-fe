import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import { getComments, addComment, updateComment, deleteComment } from '../services'
import { validateComment } from '../validators'

export const useComments = (ticketId) => {
  const comments = ref([])

  const loading = ref(false)

  const isSubmitting = ref(false)

  const newCommentText = ref('')

  const fetchComments = async () => {
    if (!ticketId.value) return

    loading.value = true

    try {
      const response = await getComments(ticketId.value)

      comments.value = response.data || []
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load comments')
    } finally {
      loading.value = false
    }
  }

  const handleAddComment = async () => {
    if (!ticketId.value) return

    const validationError = validateComment(newCommentText.value)

    if (validationError) {
      toast.error(validationError)
      return
    }

    isSubmitting.value = true

    try {
      const response = await addComment(ticketId.value, {
        content: newCommentText.value.trim(),
      })

      toast.success(response.message || 'Add comment successfully')

      newCommentText.value = ''

      await fetchComments()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add comment')
    } finally {
      isSubmitting.value = false
    }
  }

  const handleUpdateComment = async (commentId, newContent) => {
    if (!ticketId.value || !commentId) return

    const validationError = validateComment(newContent)

    if (validationError) {
      toast.error(validationError)
      return
    }

    isSubmitting.value = true

    try {
      const response = await updateComment(ticketId.value, commentId, {
        content: newContent.trim(),
      })

      toast.success(response.message || 'Update comment successfully')

      await fetchComments()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update comment')
    } finally {
      isSubmitting.value = false
    }
  }

  const handleDeleteComment = async (commentId) => {
    if (!ticketId.value || !commentId) return

    isSubmitting.value = true

    try {
      const response = await deleteComment(ticketId.value, commentId)

      toast.success(response.message || 'Delete comment successfully')

      await fetchComments()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete comment')
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    comments,
    loading,
    isSubmitting,
    newCommentText,

    fetchComments,
    handleAddComment,
    handleUpdateComment,
    handleDeleteComment,
  }
}

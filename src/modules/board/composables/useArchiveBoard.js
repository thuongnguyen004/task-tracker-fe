import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { path } from '@/shared/constants/paths.js'

export const useArchiveBoard = (isBoardMenuOpen) => {

  const isArchiveListOpen = ref(false)

  const router = useRouter()

  const handleArchiveOpen = () => {
    isBoardMenuOpen.value = false
    isArchiveListOpen.value = true
  }

  const handleSelect = (id) => {
    router.push({
      name: path.task.details.name,
      params: {
        id,
      },
    })
  }

  return {
    isBoardMenuOpen,
    isArchiveListOpen,
    handleArchiveOpen,
    handleSelect,
  }
}

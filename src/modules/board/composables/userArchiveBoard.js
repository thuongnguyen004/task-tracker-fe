import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { path } from '@/shared/constants/paths.js'

export const useArchiveBoard = () => {
  const isBoardMenuOpen = ref(false)

  const isArchiveListOpen = ref(false)

  const router = useRouter()

  const handleBoardMenuToggle = () => {
    isBoardMenuOpen.value = !isBoardMenuOpen.value

    if (isBoardMenuOpen.value) {
      isArchiveListOpen.value = false
    }
  }

  const handleArchiveOpen = () => {
    isBoardMenuOpen.value = false
    isArchiveListOpen.value = true
  }

  const handleBackMenu = () => {
    isBoardMenuOpen.value = true
    isArchiveListOpen.value = false
  }

  const handleSelect = (code) => {
    router.push({
      name: path.task.details.name,
      params: {
        code,
      },
    })
  }

  return {
    isBoardMenuOpen,
    isArchiveListOpen,
    handleBoardMenuToggle,
    handleArchiveOpen,
    handleBackMenu,
    handleSelect,
  }
}

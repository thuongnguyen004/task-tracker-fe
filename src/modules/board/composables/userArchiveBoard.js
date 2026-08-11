import { ref } from 'vue'

export const useArchiveBoard = () => {
  const isBoardMenuOpen = ref(false)

  const isArchiveListOpen = ref(false)

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

  return {
    isBoardMenuOpen,
    isArchiveListOpen,
    handleBoardMenuToggle,
    handleArchiveOpen,
    handleBackMenu,
  }
}

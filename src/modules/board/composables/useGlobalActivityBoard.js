import { ref } from 'vue'

export const useGlobalActivityBoard = (isBoardMenuOpen) => {

  const isActivityListOpen = ref(false)

  const handleActivityOpen = () => {
    isBoardMenuOpen.value = false
    isActivityListOpen.value = true
  }

  return {
    isBoardMenuOpen,
    isActivityListOpen,
    handleActivityOpen,
  }
}

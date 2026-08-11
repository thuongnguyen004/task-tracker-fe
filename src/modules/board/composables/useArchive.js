import { ref } from 'vue'

export const useArchive = () => {
  const isArchiveListOpen = ref(true)
  const isArchiveDetailOpen = ref(false)

  const selectedArchive = ref(null)

  const handleSelect = (item) => {
    selectedArchive.value = item

    isArchiveListOpen.value = false

    isArchiveDetailOpen.value = true
  }

  return {
    isArchiveListOpen,
    isArchiveDetailOpen,
    handleSelect,
    selectedArchive,
  }
}

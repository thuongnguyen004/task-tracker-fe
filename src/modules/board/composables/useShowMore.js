import { ref, computed, toValue } from 'vue'

export const useShowMore = (content, maxLength = 300) => {
  const isExpanded = ref(false)

  const shouldShowToggle = computed(() => {
    return toValue(content).length > maxLength
  })

  const displayedContent = computed(() => {
    const value = toValue(content)

    if (isExpanded.value || !shouldShowToggle.value) {
      return value
    }

    return `${value.slice(0, maxLength).trimEnd()}...`
  })

  const toggle = () => {
    isExpanded.value = !isExpanded.value
  }

  const collapse = () => {
    isExpanded.value = false
  }

  return {
    isExpanded,
    shouldShowToggle,
    displayedContent,
    toggle,
    collapse,
  }
}
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getTicketActivitiesById } from '../services'

export const useTicketActivity = (ticketById) => {
  const ticketActivities = ref([])
  const page = ref(0)
  const size = ref(20)
  const totalElements = ref(0)

  const getTicketActivities = async () => {
    if (!ticketById.value?.id) {
      ticketActivities.value = []
      totalElements.value = 0
      return
    }

    try {
      const response = await getTicketActivitiesById(ticketById.value.id, page.value, size.value)

      ticketActivities.value = response.data.data
      totalElements.value = response.data.totalElements
    } catch (error) {
      console.error(error)
    }
  }

  const handleLoadMoreActivity = async () => {
    size.value += 20
    await getTicketActivities()
  }

  const showLoadMoreButton = computed(() => {
    return (
      ticketActivities.value.length >= 20 && totalElements.value > ticketActivities.value.length
    )
  })

  return {
    ticketActivities,
    totalElements,
    size,
    getTicketActivities,
    handleLoadMoreActivity,
    showLoadMoreButton,
  }
}

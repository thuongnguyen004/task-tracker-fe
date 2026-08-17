import { computed, ref } from 'vue'
import { getTicketActivities, getTicketActivitiesByTicketCode } from '../services'

export const useTicketActivity = (ticketByCode = null) => {

  const ticketActivitiesByTicket = ref([])
  const pageByTicket = ref(0)
  const sizeByTicket = ref(20)
  const totalElementsByTicket = ref(0)


  const ticketActivities = ref([])
  const page = ref(0)
  const size = ref(20)
  const totalElements = ref(0)
  const getTicketActivitiesByTicket = async () => {
    if (!ticketByCode?.value?.code) {
      ticketActivitiesByTicket.value = []
      totalElementsByTicket.value = 0
      return
    }

    try {
      const response = await getTicketActivitiesByTicketCode(
        ticketByCode.value.code,
        pageByTicket.value,
        sizeByTicket.value,
      )

      ticketActivitiesByTicket.value = response.data.data
      totalElementsByTicket.value = response.data.totalElements
    } catch (error) {
      console.error(error)
    }
  }

  const getAllTicketActivities = async () => {
    try {
      const response = await getTicketActivities(page.value, size.value)

      ticketActivities.value = response.data.data
      totalElements.value = response.data.totalElements
    } catch (error) {
      console.error(error)
    }
  }


  const handleLoadMoreActivityByTicket = async () => {
    sizeByTicket.value += 20
    await getTicketActivitiesByTicket()
  }

  const handleLoadMoreActivity = async () => {
    size.value += 20
    await getAllTicketActivities()
  }

  const showLoadMoreButtonByTicket = computed(() => {
    return (
      ticketActivitiesByTicket.value.length >= 20 && totalElementsByTicket.value > ticketActivitiesByTicket.value.length
    )
  })

   const showLoadMoreButton = computed(() => {
    return (
      ticketActivities.value.length >= 20 && totalElements.value > ticketActivities.value.length
    )
  })

  return {
    ticketActivitiesByTicket,
    ticketActivities,
    getTicketActivitiesByTicket,
    getAllTicketActivities,
    handleLoadMoreActivity,
    handleLoadMoreActivityByTicket,
    showLoadMoreButton,
    showLoadMoreButtonByTicket
  }
}

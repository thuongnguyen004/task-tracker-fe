import { onMounted, ref } from 'vue'
import { useTicketMetadataStore } from '../stores/ticketMetadata'

export const useFetch = () => {
  const statuses = ref([])
  const priorities = ref([])
  const assignees = ref([])
  const metadataStore = useTicketMetadataStore()
  onMounted(async () => {
    statuses.value = await metadataStore.fetchStatuses()
    priorities.value = await metadataStore.fetchPriorities()
    assignees.value = await metadataStore.fetchAssignees()
  })
  return {
    statuses,
    priorities,
    assignees
  }
}

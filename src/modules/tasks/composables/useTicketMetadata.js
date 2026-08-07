import { onMounted } from 'vue'
import { useTicketMetadataStore } from '../stores'
import { storeToRefs } from 'pinia'

export const useTicketMetadata = () => {
  const metadataStore = useTicketMetadataStore()

  const { statuses, priorities, assignees } = storeToRefs(metadataStore)

  onMounted(async () => {
    await metadataStore.fetchMetadata()
  })

  return {
    statuses,
    priorities,
    assignees,
  }
}

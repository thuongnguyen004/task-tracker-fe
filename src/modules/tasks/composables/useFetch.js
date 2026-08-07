import { onMounted, ref } from 'vue'
import { useTicketMetadataStore } from '../stores/ticket-metadata'

export const useFetch = () => {
  const metadataStore = useTicketMetadataStore();

  const { statuses, priorities, assignees } = storeToRefs(metadataStore);

  onMounted(async () => {
    await metadataStore.fetchMetadata();
  });

  return {
    statuses,
    priorities,
    assignees,
  };
}

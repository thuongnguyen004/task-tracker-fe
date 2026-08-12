import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getTicketPriorities, getTicketStatuses } from '../services'
import { getAssignees } from '@/modules/users/services'

export const useTicketMetadataStore = defineStore('ticketMetadata', () => {
  const statuses = ref([])
  const priorities = ref([])
  const assignees = ref([])

  const fetchMetadata = async () => {
    try {
      const [statusesResponse, prioritiesResponse, assigneesResponse] = await Promise.all([
        getTicketStatuses(),
        getTicketPriorities(),
        getAssignees(),
      ])

      statuses.value = statusesResponse.data.map((item) => ({
        value: item.id,
        label: item.name,
      }))

      priorities.value = prioritiesResponse.data.map((item) => ({
        value: item.id,
        label: item.name,
      }))

      assignees.value = assigneesResponse.data.map((item) => ({
        value: item.id,
        label: item.username,
      }))
    } catch (error) {
      console.error(error)
    }
  }

  return {
    statuses,
    priorities,
    assignees,
    fetchMetadata,
  }
})

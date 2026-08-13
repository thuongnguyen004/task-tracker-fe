import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getTicketPriorities, getTicketStatuses } from '../services'
import { getAssignees } from '@/modules/users/services'
import { toast } from 'vue3-toastify'

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
        id: item.id,
        value: item.id,
        username: item.username,
        label: item.fullName,
      }))
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load ticket metadata')
    }
  }

  return {
    statuses,
    priorities,
    assignees,
    fetchMetadata,
  }
})

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

      const rawStatuses = Array.isArray(statusesResponse)
        ? statusesResponse
        : statusesResponse?.data || []
      statuses.value = rawStatuses.map((item) => ({
        value: item.id,
        label: item.name || item.label || '',
        name: item.name || '',
      }))

      const rawPriorities = Array.isArray(prioritiesResponse)
        ? prioritiesResponse
        : prioritiesResponse?.data || []
      priorities.value = rawPriorities.map((item) => ({
        value: item.id,
        label: item.name || item.label || '',
        name: item.name || '',
      }))

      const rawAssignees = Array.isArray(assigneesResponse)
        ? assigneesResponse
        : assigneesResponse?.data || []
      assignees.value = rawAssignees.map((item) => {
        const displayName = item.fullName || item.username || item.name || 'Unknown'
        return {
          id: item.id,
          value: item.id,
          username: item.username || displayName,
          fullName: item.fullName || displayName,
          name: displayName,
          label: displayName,
        }
      })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load ticket metadata')
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

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getTicketPriorities, getTicketStatuses } from '../services'
import { getAssignees } from '@/modules/users/services'

export const useTicketMetadataStore = defineStore('ticketMetadata', () => {
  const statuses = ref([])
  const priorities = ref([])
  const assignees = ref([])

  const fetchStatuses = async () => {
    try {
      const response = await getTicketStatuses()
      statuses.value = response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }))
    } catch (error) {
      console.error(error)
    }
  }

  const fetchPriorities = async () => {
    try {
      const response = await getTicketPriorities()
      priorities.value = response.data.map((item) => ({
        value: item.id,
        label: item.name,
      }))
    } catch (error) {
      console.error(error)
    }
  }

  const fetchAssignees = async () => {
    try {
      const response = await getAssignees()
      assignees.value = response.data.map((item) => ({
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
    fetchStatuses,
    fetchPriorities,
    fetchAssignees,
  }
})

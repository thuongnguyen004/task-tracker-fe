export const path = {
  auth: {
    href: '/',

    login: {
      href: 'login',
      name: 'login',
    },

    register: {
      href: 'register',
      name: 'register',
    },

    api: {
      login: '/auth/login',
      register: '/auth/register',
      refresh: '/auth/refresh',
      logout: '/auth/logout',
      currentUser: '/auth/current-user',
    },
  },

  user: {
    href: '/user',

    profile: {
      href: 'profile',
      name: 'profile',
    },

    api: {
      assignees: `assignees`,
      profile: '/auth/current-user',
    },
  },

  task: {
    href: '/ticket',

    board: {
      href: 'sprint-board',
      name: 'sprint-board',
    },

    details: {
      href: 'details-ticket/:code',
      name: 'details-ticket',
    },

    api: {
      create: `tickets`,
      update: (id) => `tickets/${id}`,
      changeStatus: (ticketId, statusId) => `tickets/${ticketId}/status/${statusId}`,
      getById: (id) => `tickets/${id}`,
      getByCode: (code) => `tickets/code/${code}`,
      comments: (ticketId) => `tickets/${ticketId}/comments`,
      commentUpdate: (ticketId, commentId) => `tickets/${ticketId}/comments/${commentId}`,
      commentDelete: (ticketId, commentId) => `tickets/${ticketId}/comments/${commentId}`,
      ticketStatuses: `ticket-statuses`,
      ticketPriorities: `ticket-priorities`,
      list: '/tickets',
      listById: (id) => `/tickets/${id}`,
      columns: '/columns',
    },
  },
}

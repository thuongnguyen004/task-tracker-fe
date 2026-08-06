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
  },
  user: {
    href: '/user',
    profile: {
      href: 'profile',
      name: 'profile',
    },
    api: {
      assignees: `assignees`,
    },
  },
  task: {
    href: '/ticket',
    board: {
      href: 'sprint-board',
      name: 'sprint-board',
    },
    details: {
      href: 'details-ticket',
      name: 'details-ticket',
    },
    api: {
      update: (id) => `tickets/${id}`,
      ticketStatuses: `ticket-statuses`,
      ticketPriorities: `ticket-priorities`,
    },
  },
}

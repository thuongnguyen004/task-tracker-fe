export const path = {
  auth: {
    href: '/auth',

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
      href: 'details-ticket',
      name: 'details-ticket',
    },

    api: {
      list: '/tickets',
      columns: '/columns',
    },
  },
}

export const paths = path

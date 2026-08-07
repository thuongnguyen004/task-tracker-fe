const COLUMNS = [
  { id: 'todo', name: 'TO DO', statusId: 1, accentBg: 'bg-status-primary' },
  {
    id: 'in_progress',
    name: 'IN PROGRESS',
    statusId: 2,
    accentBg: 'bg-status-secondary',
  },
  {
    id: 'code_review',
    name: 'CODE REVIEW',
    statusId: 3,
    accentBg: 'bg-status-tertiary',
  },
  {
    id: 'ready_for_qa',
    name: 'READY FOR QA',
    statusId: 4,
    accentBg: 'bg-status-quaternary',
  },
  { id: 'done', name: 'DONE', statusId: 5, accentBg: 'bg-status-quinary' },
]

const SEED_TICKETS = [
  // TO DO (7)
  {
    id: '1',
    title: 'Set up project repository and CI/CD pipeline',
    priority: 'High',
    statusId: 1,
    assignee: 'Alex Lee',
  },
  {
    id: '2',
    title: 'Design database schema for tickets and users',
    priority: 'Critical',
    statusId: 1,
    assignee: 'Michael Park',
  },
  {
    id: '3',
    title: 'Write API documentation template',
    priority: 'Medium',
    statusId: 1,
    assignee: null,
  },
  {
    id: '4',
    title: 'Create seed data scripts',
    priority: 'Low',
    statusId: 1,
    assignee: 'Taylor Nguyen',
  },
  {
    id: '5',
    title: 'Create seed data scripts 2',
    priority: 'Low',
    statusId: 1,
    assignee: 'Taylor Nguyen',
  },
  {
    id: '6',
    title: 'Create seed data scripts 3',
    priority: 'Low',
    statusId: 1,
    assignee: 'Taylor Nguyen',
  },
  {
    id: '7',
    title: 'Create seed data scripts 4',
    priority: 'Low',
    statusId: 1,
    assignee: 'Taylor Nguyen',
  },

  // IN PROGRESS (3)
  {
    id: '8',
    title: 'Implement user registration endpoint',
    priority: 'High',
    statusId: 2,
    assignee: 'Alex Lee',
  },
  {
    id: '9',
    title: 'Build login page with JWT handling',
    priority: 'High',
    statusId: 2,
    assignee: 'Michael Park',
  },
  {
    id: '10',
    title: 'Create ticket CRUD API',
    priority: 'Medium',
    statusId: 2,
    assignee: 'Taylor Nguyen',
  },

  // CODE REVIEW (2)
  {
    id: '11',
    title: 'Implement board layout component',
    priority: 'Medium',
    statusId: 3,
    assignee: 'Alex Lee',
  },
  {
    id: '12',
    title: 'Add search bar with filters',
    priority: 'Low',
    statusId: 3,
    assignee: 'Michael Park',
  },

  // READY FOR QA (2)
  {
    id: '13',
    title: 'User profile page UI',
    priority: 'Medium',
    statusId: 4,
    assignee: 'Taylor Nguyen',
  },
  {
    id: '14',
    title: 'Error handling middleware',
    priority: 'High',
    statusId: 4,
    assignee: 'Alex Lee',
  },

  // DONE (1)
  {
    id: '15',
    title: 'Project kickoff and sprint planning',
    priority: 'Medium',
    statusId: 5,
    assignee: 'Michael Park',
  },
]

export const getColumns = async () => {
  return COLUMNS
}

export const getTickets = async () => {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return SEED_TICKETS
}

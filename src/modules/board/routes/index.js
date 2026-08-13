import { path } from '@/shared/constants/paths.js'
import SprintBoardPage from '../views/SprintBoardPage.vue'
import DetailsTicketPage from '../views/DetailsTicketPage.vue'
import NotFoundPage from '@/modules/notfound/views/NotFoundPage.vue'

export default [
  {
    path: path.task.notfound.href,
    redirect: {
      name: path.notFound.name,
    },
  },
  {
    path: path.task.board.href,
    name: path.task.board.name,
    component: SprintBoardPage,
  },
  {
    path: path.task.details.href,
    name: path.task.details.name,
    component: DetailsTicketPage,
  },
]

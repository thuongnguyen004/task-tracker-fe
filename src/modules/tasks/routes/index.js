import { path } from '@/shared/constants/path.constant.js'
import SprintBoardPage from '../views/SprintBoardPage.vue'
import DetailsTicketPage from '../views/DetailsTicketPage.vue'
import { path } from '@/shared/constants/path.constants'
import SprintBoardPage from '../views/SprintBoardPage.vue'

export default [
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

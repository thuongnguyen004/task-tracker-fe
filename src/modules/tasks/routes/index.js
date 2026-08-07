import { path } from '@/shared/constants/path.constants'
import SprintBoardPage from '../views/SprintBoardPage.vue'

export default [
  {
    path: path.task.board.href,
    name: path.task.board.name,
    component: SprintBoardPage,
  },
]

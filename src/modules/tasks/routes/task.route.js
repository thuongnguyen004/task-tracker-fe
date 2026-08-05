import { path } from "@/shared/constants/path.constants";
import SprintBoardPage from "../views/SprintBoardPage.vue";
import DetailsTicketPage from "../views/DetailsTicketPage.vue";

export default [
    {
        path: path.task.board.href,
        name: path.task.board.name,
        component: SprintBoardPage
    },
    {
        path: path.task.details.href,
        name: path.task.details.name,
        component: DetailsTicketPage
    }
]
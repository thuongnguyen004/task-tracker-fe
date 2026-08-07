import { path } from '@/shared/constants/path.constants'
import UserProfilePage from '../views/UserProfilePage.vue'

export default [
  {
    path: path.user.profile.href,
    name: path.user.profile.name,
    component: UserProfilePage,
  },
]

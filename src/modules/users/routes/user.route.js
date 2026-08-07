import { path } from '@/shared/constants/path.constant.js'
import ProfilePage from '../views/ProfilePage.vue'

export default [
  {
    path: path.user.profile.href,
    name: path.user.profile.name,
    component: ProfilePage,
  },
]

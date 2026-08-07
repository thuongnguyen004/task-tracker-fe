import { path } from '@/shared/constants/path.constants'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'

export default [
  {
    path: path.auth.login.href,
    name: path.auth.login.name,
    component: LoginPage,
  },
  {
    path: path.auth.register.href,
    alias: '/register',
    name: path.auth.register.name,
    component: RegisterPage,
  },
]

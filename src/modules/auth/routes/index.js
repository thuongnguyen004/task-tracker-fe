import { path } from '@/shared/constants/paths.js'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'

export default [
  {
    path: '',
    redirect: { name: path.auth.login.name },
  },
  {
    path: path.auth.login.href,
    alias: '/login',
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

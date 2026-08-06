import AuthLayout from '@/layouts/AuthLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import authRoute from '@/modules/auth/routes/auth.route'
import taskRoute from '@/modules/tasks/routes'
import userRoute from '@/modules/users/routes/route'
import { path } from '@/shared/constants/path.constants'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: path.auth.href,
      redirect: path.auth.login.href,
    },
    {
      path: path.auth.href,
      component: AuthLayout,
      children: authRoute,
    },
    {
      path: path.task.href,
      component: DefaultLayout,
      children: [{ path: '', redirect: { name: path.task.board.name } }, ...taskRoute],
    },
    {
      path: path.user.href,
      component: DefaultLayout,
      children: [{ path: '', redirect: { name: path.user.profile.name } }, ...userRoute],
    },
  ],
})

export default router

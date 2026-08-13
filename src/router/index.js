import AuthLayout from '@/layouts/AuthLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import authRoute from '@/modules/auth/routes'
import taskRoute from '@/modules/board/routes'
import NotFoundPage from '@/modules/notfound/views/NotFoundPage.vue'
import userRoute from '@/modules/users/routes'
import { path } from '@/shared/constants/paths'
import { tokenStorage } from '@/shared/utils'
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
      children: taskRoute,
      meta: { requiresAuth: true },
    },

    {
      path: path.user.href,
      component: DefaultLayout,
      children: userRoute,
      meta: { requiresAuth: true },
    },
    {
      path: path.notFound.href,
      name: path.notFound.name,
      component: NotFoundPage,
    },
  ],
})

router.beforeEach((to) => {
  const isAuthenticated = !!tokenStorage.get()

  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    return { name: path.auth.login.name }
  }
})

export default router

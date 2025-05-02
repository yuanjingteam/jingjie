import { useUserStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/loginPage.vue'),
    },
    {
      path: '/',
      component: () => import('@/views/layout/layoutContainer.vue'),
      redirect: '/manage/dashBoard',
      children: [
        {
          path: '/manage/dashBoard',
          component: () => import('@/views/manage/dashboardManage.vue'),
        },
        {
          path: '/manage/map',
          component: () => import('@/views/manage/mapManage.vue'),
        },
        {
          path: '/manage/category',
          component: () => import('@/views/manage/categoryManage.vue'),
        },
        {
          path: '/manage/dataSource',
          component: () => import('@/views/manage/dataSourceManage.vue'),
        },
      ],
    },
    {
      path: '/edit/:id',
      component: () => import('@/views/data/dataEdit.vue'),
    },
    {
      path: '/view/:id',
      component: () => import('@/views/data/dataView.vue'),
    },
  ],
})
router.beforeEach((to) => {
  const userStore = useUserStore()
  const token = userStore.token
  if (!token && to.path !== '/login') {
    return '/login'
  }
})
export default router

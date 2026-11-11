import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/user",
      name: "user",
      component: () => import("../pages/User.vue")
    },
    {
      path: "/activity",
      name: "activity",
      component: () => import("../pages/Activity.vue")
    }
  ],
})

export default router

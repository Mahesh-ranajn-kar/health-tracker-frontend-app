import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "welcome",
      component: () => import("../pages/home/HomePage.vue")
    },
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

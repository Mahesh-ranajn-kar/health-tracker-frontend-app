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
      path:'/login',
      name:'login',
      component:() => import('../auth/LoginPage.vue')
    },
    {
      path:'/dashboard',
      name:'dashboard',
      component:() => ("<h1>Hello</h1>")
    },
    {
      path:'/:pathMatch(.*)*',
      redirect:'/'
    }
  ],
})

export default router

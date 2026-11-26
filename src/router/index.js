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
      component:() => import("../pages/Dashboard.vue")
    },
    {
      path:'/users',
      name:'users',
      component:() => import("../pages/user-management/Users.vue")
    },
    {
      path:'/manage-activities',
      name:'manage-activities',
      component:() => import("../pages/ManageActivities.vue")
    },
    {
      path:'/profile',
      name:'profile',
      component:() => import("../pages/Profile.vue")
    },
    {
      path:'/:pathMatch(.*)*',
      redirect:'/'
    }
  ],
})

export default router

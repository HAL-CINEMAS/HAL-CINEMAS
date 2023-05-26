import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/myMain.vue'),
    name: 'main',
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/myHome.vue')
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('../views/myLogin.vue')
      },
      {
        path: '/movie',
        name: 'movie',
        component: () => import('../views/myMovie.vue')
      },
      {
        path: '/schedule',
        name: 'Schedule',
        component: () => import('../views/mySchedule.vue'),
        props: true
      },
      {
        path: '/seat',
        name: 'seat',
        component: () => import('../views/mySeat.vue'),
        props: true
      }

    ]
  }

]

const router = new VueRouter({
  routes
})

export default router

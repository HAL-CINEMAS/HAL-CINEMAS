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
        redirect: 'seat/ticket1',
        props: true,
        children: [
          { path: 'ticket1', name: 'ticket1', component: () => import('../views/mySeatDetail.vue') },
          { path: 'ticket2', name: 'ticket2', component: () => import('../views/myTicket.vue') },
          { path: 'userinfo', name: 'userinfo', component: () => import('../views/myUserInfo.vue') }
        ]
      },
      {
        path: '/pay',
        name: 'pay',
        component: () => import('../views/myPay.vue')
      },
      {
        path: '/payend',
        name: 'payend',
        component: () => import('../views/myPayend.vue')
      },
      {
        path: '/allschedule',
        name: 'allschedule',
        component: () => import('../views/myAllSchedule.vue')
      },
      {
        path: '/cinemas',
        name: 'cinemas',
        component: () => import('../views/myCinemas.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('../views/myRegister.vue'),
        redirect: 'register/step1',
        children: [
          { path: 'step1', name: 'step1', component: () => import('../views/register/myRegisterStep1.vue') },
          { path: 'step2', name: 'step2', component: () => import('../views/register/myRegisterStep2.vue') },
          { path: 'step3', name: 'step3', component: () => import('../views/register/myRegisterStep3.vue') }
        ]
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/myUser.vue')
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router

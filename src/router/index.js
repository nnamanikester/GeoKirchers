import Vue from 'vue'
import VueRouter from 'vue-router'
import Gmap from '../views/Gmap.vue'
import VueMeta from 'vue-meta'
import firebase from '@/firebase/init'

Vue.use(VueRouter)
Vue.use(VueMeta)

const routes = [
  {
    path: '/',
    name: 'Gmap',
    component: Gmap,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/auth/Signup.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/Login.vue')
  },
  {
    path: '/profile/:id',
    name: 'ViewProfile',
    component: () => import('../views/ViewProfile.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    let user = firebase.auth().currentUser
    if (user) {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

export default router

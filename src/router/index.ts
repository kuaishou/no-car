import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import product from '../views/product/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'product',
    component: product
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),// hash模式：createWebHashHistory，history模式：createWebHistory
  routes
})

export default router

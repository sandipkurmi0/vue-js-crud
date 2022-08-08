import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'tutorials',
    component: () => import('../views/TutorialsListView.vue')
  },
  {
    path: '/tutorials/:id',
    name: 'tutorial-details',
    component: () => import('../views/TutorialView.vue')
  },
  {
    path: '/add',
    name: 'add',
    component: () => import('../views/AddTutorialView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

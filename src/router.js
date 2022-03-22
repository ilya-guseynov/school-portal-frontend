import { createRouter, createWebHistory } from 'vue-router'

import HomeView from './views/home-view.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: 'about' */ './views/about-view.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ './views/login-view.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: 'register' */ './views/register-view.vue'),
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import(/* webpackChunkName: 'logout' */ './views/logout-view.vue'),
  },
  {
    path: '/classes',
    name: 'classes',
    component: () => import(/* webpackChunkName: 'classes' */ './views/classes-view.vue'),
  },
  {
    path: '/schedule',
    name: 'schedule',
    component: () => import(/* webpackChunkName: 'schedule' */ './views/schedule-view.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: 'profile' */ './views/profile-view.vue'),
  },
  {
    path: '/messages',
    name: 'messages',
    component: () => import(/* webpackChunkName: 'messages' */ './views/messages-view.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

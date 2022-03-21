import { createRouter, createWebHistory } from 'vue-router'

import HomeView from './components/views/home-view.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: 'about' */ './components/views/about-view.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ './components/views/login-view.vue'),
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import(/* webpackChunkName: 'logout' */ './components/views/logout-view.vue'),
  },
  {
    path: '/classes',
    name: 'classes',
    component: () => import(/* webpackChunkName: 'classes' */ './components/views/classes-view.vue'),
  },
  {
    path: '/schedule',
    name: 'schedule',
    component: () => import(/* webpackChunkName: 'schedule' */ './components/views/schedule-view.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: 'profile' */ './components/views/profile-view.vue'),
  },
  {
    path: '/messages',
    name: 'messages',
    component: () => import(/* webpackChunkName: 'messages' */ './components/views/messages-view.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: 'home' },
    { path: '/home', name: 'home', component: () => import("../components/home.component.vue") },
    { path: '/analytics/health-checks', name: 'health-checks', component: () => import("../components/health-checks.component.vue") },
    { path: '/:catchAll(.*)', name: 'not-found', component: () => import("../components/not-found-page.component.vue") }
  ]
})

export default router

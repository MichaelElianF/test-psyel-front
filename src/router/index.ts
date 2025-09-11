import { createRouter, createWebHistory } from 'vue-router'
import StudentView from '../views/StudentView.vue'
import CourseView from '../views/CourseView.vue'
import ReportView from '../views/ReportView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: StudentView,
    },
    {
      path: '/courses',
      name: 'courses',
      component: CourseView,
    },
    {
      path: '/reports',
      name: 'reports',
      component: ReportView,
    },
  ],
})

export default router

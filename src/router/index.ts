import { createRouter, createWebHistory } from 'vue-router'
import StudentView from '../views/StudentView.vue'
import CourseView from '../views/CourseView.vue'
import ReportView from '../views/ReportView.vue'
import StudentSingle from '@/components/students/StudentSingle.vue'
import CourseSingle from '@/components/courses/CourseSingle.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      children: [
        { path: '', component: StudentView },
        { path: 'student/:id', name: 'studentSingle', props: true, component: StudentSingle },
      ],
    },
    {
      path: '/courses',
      name: 'coursesList',
      children: [
        { path: '', component: CourseView },
        { path: 'courses/:id', name: 'courseSingle', props: true, component: CourseSingle },
      ],
    },
    {
      path: '/reports',
      name: 'reportsList',
      component: ReportView,
    },
  ],
})

export default router

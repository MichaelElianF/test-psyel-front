import { createRouter, createWebHistory } from 'vue-router'
import StudentView from '../views/StudentView.vue'
import CourseView from '../views/CourseView.vue'
import ReportView from '../views/ReportView.vue'
import Student from '@/components/students/Student.vue'
import Course from '@/components/courses/Course.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: StudentView,
    },
    {
      path: '/student/:id',
      name: 'student',
      props: true,
      component: Student,
    },
    {
      path: '/courses',
      name: 'coursesList',
      component: CourseView,
    },
    {
      path: '/course/:id',
      name: 'course',
      props: true,
      component: Course,
    },
    {
      path: '/reports',
      name: 'reportsList',
      component: ReportView,
    },
  ],
})

export default router

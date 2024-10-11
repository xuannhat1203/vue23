import { createWebHashHistory, createRouter } from 'vue-router'
import StudentDetail from '@/view/StudentDetail.vue'
import ListStudent from '@/view/ListStudent.vue'

const routes = [
  { path: '/', component: ListStudent },
  { path: '/:id', component: StudentDetail },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
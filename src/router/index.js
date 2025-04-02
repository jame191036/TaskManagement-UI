// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import TaskList from '../components/TaskList.vue'; // Adjust paths if needed
import TaskDetail from '../components/TaskDetail.vue'; // Adjust paths if needed

const routes = [
  {
    path: '/',
    name: 'TaskList',
    component: TaskList,
  },
  {
    path: '/task/:id',
    name: 'TaskDetail',
    component: TaskDetail,
    props: true, // Pass route params as props
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

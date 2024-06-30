import { createRouter, createWebHistory } from 'vue-router';
import FormView from '../views/FormView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'form',
      component: FormView,
    },
    {
      path: '/fetch',
      name: 'fetch',
      component: () => import('../views/FetchView.vue'),
    },
    {
      path: '/table',
      name: 'table',
      component: () => import('../views/TableView.vue'),
    },
    {
      path: '/table2',
      name: 'table2',
      component: () => import('../views/Table2View.vue'),
    },
  ],
});

export default router;

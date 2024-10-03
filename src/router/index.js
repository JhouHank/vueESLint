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
    {
      path: '/table3',
      name: 'table3',
      component: () => import('../views/Table3View.vue'),
    },
    {
      path: '/skeleton',
      name: 'skeleton',
      component: () => import('../views/SkeletonView.vue'),
    },
    {
      path: '/colorMode',
      name: 'colorMode',
      component: () => import('../views/ColorModeView.vue'),
    },
    {
      path: '/dialog',
      name: 'dialog',
      component: () => import('../views/DialogView.vue'),
    },
    {
      path: '/tanstackQuery',
      name: 'tanstackQuery',
      component: () => import('../views/TanstackQueryView.vue'),
    },
    {
      path: '/vueuse',
      name: 'vueuse',
      component: () => import('../views/VueuseView.vue'),
    },
  ],
});

export default router;

import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '@/views/DashboardView.vue';
import DevicesView from '@/views/DevicesView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
      meta: { title: 'Dashboard' },
    },
    {
      path: '/devices',
      name: 'devices',
      component: DevicesView,
      meta: { title: 'Dispositivos' },
    },
  ],
});

router.beforeEach((to) => {
  document.title = `${to.meta.title || 'PetCare IoT'} - PetCare IoT`;
});

export default router;

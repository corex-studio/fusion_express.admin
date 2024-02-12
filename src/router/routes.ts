import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/home/Home.vue'),
        redirect: {
          name: 'conceptionsList',
        },
        children: [
          {
            path: '/conceptions',
            name: 'conceptionsList',
            component: () => import('pages/conception/ConceptionsList.vue'),
          },
          {
            path: '/conceptions/:conceptionId',
            name: 'conceptionDetail',
            component: () => import('pages/conception/ConceptionDetail.vue'),
          },
          {
            path: '/schedule',
            name: 'schedulePage',
            component: () => import('pages/schedule/SchedulePage.vue'),
          },
          {
            path: '/waybills',
            name: 'waybillsList',
            component: () => import('pages/waybill/WaybillsList.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('src/pages/auth/AuthPage.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;

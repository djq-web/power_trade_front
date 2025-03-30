import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    name: 'notFound',
    path: '/:path(.*)+',
    redirect: {
      name: '404',
    },
  },
  {
    name: 'home',
    path: '/',
    component: () => import('@/view/home/home.vue'),
    children: [
      {
        name: 'TradingCalendar',
        path: '/trading-calendar',
        component: () => import('@/view/TradingCalendarView.vue'),
        meta: {
          title: '交易日历',
        },
      },
      {
        path: '/long-term',
        name: 'LongTerm',
        component: () => import('@/view/LongTermView.vue'),
        children: [
          {
            path: 'trading-desk',
            name: 'TradingDesk',
            component: () => import('@/view/long-term/TradingDeskView.vue'),
          },
          {
            path: 'analysis',
            name: 'LongTermAnalysis',
            component: () => import('@/view/long-term/AnalysisView.vue'),
          },
        ],
        meta: {
          title: '交易工作台',
        },
      },
    ],
    meta: {
      title: '首页',
    },
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/view/user/login/login.vue'),
    meta: {
      title: '注册',
    },
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('@/view/user/register/register.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/view/notFound/notFound.vue'),
    meta: {
      title: '404',
    },
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach((to, from, next) => {
  const title = to?.meta?.title;
  if (title) {
    document.title = title as string;
  }
  next();
});

export default router;

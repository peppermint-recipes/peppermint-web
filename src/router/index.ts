import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: () => import('../components/recipe-list.vue'),
  // },
  {
    path: '/',
    name: 'login',
    // meta: {
    //   name: '',
    //   requiresAuth: false,
    // },
    component: () => import('../components/login-view.vue'),
    // beforeEnter: (to, from, next) => {
    //     if (store.getters.jwt) {
    //         next('/menu');
    //     } else {
    //         next();
    //     }
    // },
    children: [
      {
        path: '',
        component: () => import('@/components/auth/login.vue'),
      },
      {
        path: '/register',
        name: '',
        component: () => import('@/components/auth/register.vue'),
      },
    ],
  },
  {
    path: '/recipe/:id?',
    name: 'recipe',
    props: true,
    component: () => import('../components/recipe-detail.vue'),
  },
  {
    path: '/recipes',
    name: 'recipes',
    component: () => import('../components/recipe-list.vue'),
  },
  {
    path: '/week',
    name: 'week',
    component: () => import('../components/weekly-menu/week.vue'),
  },
  {
    path: '/shopping-list',
    name: 'shippingList',
    component: () => import('../components/shopping-list/list.vue'),
  },
  // {
  //   path: '/settings',
  //   name: 'settings',
  //   component: () => import('../components/settings.vue'),
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

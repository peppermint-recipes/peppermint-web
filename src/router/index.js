import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/components/recipe-list.vue'),
  },
  {
    path: '/recipe/:id?',
    name: 'recipe',
    props: true,
    component: () => import('@/components/recipe-detail.vue'),
  },
  {
    path: '/recipes',
    name: 'recipes',
    component: () => import('@/components/recipe-list.vue'),
  },
  {
    path: '/week',
    name: 'week',
    component: () => import('@/components/weekly-menu/week.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

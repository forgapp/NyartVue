import Vue from 'vue';
import Router from 'vue-router';
import NotFound from '@/pages/notFound';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'Home',
    component: () => import('@/pages/home')
  }, {
    path: '/new',
    name: 'New',
    component: () => import('@/pages/new')
  }, {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }]
});

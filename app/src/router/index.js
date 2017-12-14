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
    path: '/search',
    name: 'Search',
    component: () => import('@/pages/search')
  }, {
    path: '/details/:type/:id',
    name: 'Details',
    component: () => import('@/pages/details')
  }, {
    path: '/edit-info/:type/:id',
    name: 'EditInformation',
    component: () => import('@/pages/editInformation')
  }, {
    path: '/edit-resumes/:id',
    name: 'EditResumes',
    component: () => import('@/pages/editResumes')
  }, {
    path: '/edit-notes/:type/:fieldname/:id',
    name: 'EditNotes',
    component: () => import('@/pages/editNotes')
  }, {
    path: '/process/new',
    name: 'NewProcess',
    component: () => import('@/pages/newProcess')
  }, {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }]
});

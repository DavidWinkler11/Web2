import { createRouter, createWebHistory } from 'vue-router';
import MainView from '../components/MainView.vue';
import NotFound from '../components/NotFound.vue'; 

const routes = [
  {
    path: '/',
    component: MainView,
  },
  {
    path: '/:catchAll(.*)',
    component: NotFound, 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '../pages/home.vue';
import spaceApp from './../pages/space-app.vue'
import spaceDetails from '../pages/space-details.vue'
import spaceEditAdd from '../pages/space-edit-add.vue'
import about from '../pages/about.vue'
import dashboard from '../pages/dashboard.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: home,
  },
  {
    path: '/about',
    name: 'about',
    component: about,
  },
  {
    path: '/space',
    name: 'space-app',
    component: spaceApp,
  },
  {
    path: '/space/:spaceId',
    name: 'space-details',
    component: spaceDetails,
  },
  {
    path: '/space/host/edit/:spaceId?',
    name: 'space-edit-add',
    component: spaceEditAdd,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard,
  },

];

const router = new VueRouter({
  routes,
});

export default router;

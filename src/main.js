import Vue from 'vue';
import App from './app.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import './assets/styles/main.scss'


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

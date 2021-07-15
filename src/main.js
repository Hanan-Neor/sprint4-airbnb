import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './assets/styles/main.scss';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(ElementUI);

import './assets/styles/main.scss';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDyKytLc6HSBg15d2n3erx3dlTpxi4Xci8',
    libraries: 'places',
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

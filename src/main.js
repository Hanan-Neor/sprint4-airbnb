import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './assets/styles/main.scss';
import * as VueGoogleMaps from 'vue2-google-maps';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en';
Vue.use(ElementUI, { locale });


// import AirbnbStyleDatepicker from 'vue-airbnb-style-datepicker'
// import 'vue-airbnb-style-datepicker/dist/vue-airbnb-style-datepicker.min.css'
// const datepickerOptions = {}
// Vue.use(AirbnbStyleDatepicker, datepickerOptions)
// import { formatDistance, subDays } from 'date-fns'



import './assets/styles/main.scss';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDyKytLc6HSBg15d2n3erx3dlTpxi4Xci8',
    libraries: 'places',
    language: 'en',
  },
});

Vue.directive('click-outside', {
  bind: function (element, binding, vnode) {
    element.clickOutsideEvent = function (event) {  //  check that click was outside the el and his children
      if (!(element === event.target || element.contains(event.target))) { // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event);
        // binding.value(); run the arg
      }
    };
    document.body.addEventListener('click', element.clickOutsideEvent)
  },
  unbind: function (element) {
    document.body.removeEventListener('click', element.clickOutsideEvent)
  }
});

new Vue({
  router,
  store,
  // AirbnbStyleDatepicker,
  
  render: (h) => h(App),
}).$mount('#app');

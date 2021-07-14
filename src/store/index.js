import Vue from 'vue';
import Vuex from 'vuex';
import { spaceStore } from './modules/space.store.js';
import { orderStore } from './modules/order.store.js';
import { userStore } from './modules/user.store.js';
import { reviewStore } from './modules/review.store.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    spaceStore,
    orderStore,
    userStore,
    reviewStore,
  },
});

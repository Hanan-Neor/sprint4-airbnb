import Vue from 'vue';
import Vuex from 'vuex';
import { spaceStore } from './modules/space.store.js';
import { orderStore } from './modules/order.store.js';
import { userStore } from './modules/user.store.js';
import { reviewStore } from './modules/review.store.js';
import { tripStore } from './modules/trip.store.js'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    screenWidth: window.innerWidth,
    coverVisible: false,
  },
  getters: {
    screenWidth({ screenWidth }) { return screenWidth },
    isMobScreen({ screenWidth }) { return screenWidth <= 460 },
    isSmallScreen({ screenWidth }) { return screenWidth <= 720 },
    isLargeScreen({ screenWidth }) { return screenWidth > 720 },
    coverVisible(state) { return state.coverVisible },
  },
  mutations: {
    showCover(state) { state.coverVisible = true; },
    hideCover(state) { state.coverVisible = false; },
  },
  actions: {
    showCover(a) {
      a.commit({ type: 'showCover' });
      console.log('showing cover', a.state.coverVisible);
    },

    hideCover(a) {
      console.log(a);
      a.commit({ type: 'hideCover' });
      console.log('hiding cover', a.state.coverVisible);
    },
  },
  modules: {
    spaceStore,
    orderStore,
    userStore,
    reviewStore,
    tripStore
  },
});

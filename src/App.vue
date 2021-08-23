<template>
  <div id="app">
    <div class="cover" v-bind:class="coverVisibility">
      <!-- <login></login> -->
    </div>
    <app-header class="main-layout"/>
    <router-view class="main-layout" />
    <app-footer />
  </div>
</template>

<script>
import appHeader from './cmps/app-header.vue';
import appFooter from './cmps/app-footer.vue';
import Login from './cmps/app-header/login.vue';

export default {
  data() {
    return {};
  },
  computed: {
    coverVisibility() {
      return [
        { 'visible-cover': this.$store.getters.coverVisible },
        { 'hidden-cover': !this.$store.getters.coverVisible },
      ];
    },
  },
  components: {
    appHeader,
    appFooter,
    Login,
  },
};
</script>

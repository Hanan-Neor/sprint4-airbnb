<template>
  <div id="app">
    <app-header class="main-layout" />
    <router-view class="main-layout" />
    <app-footer />
  </div>
</template>

<script>
import appHeader from './cmps/app-header.vue';
import appFooter from './cmps/app-footer.vue';

export default {
  data() {
    return {};
  },
  components: {
    appHeader,
    appFooter,
  },
};
</script>

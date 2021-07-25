<template>
  <div class="app-footer" :class="{ hide }">
    <nav>
      <router-link to="/">Home</router-link> 
      <router-link to="/space">Explore</router-link> 
      <router-link to="/space/host/edit">Host your Home</router-link> 
      <router-link to="/about">about chatapp</router-link> 
      <router-link to="/dashboard">Dashboard</router-link> 
      <router-link to="/dashboard">Signup</router-link> 
      <router-link to="/dashboard">Login</router-link> 
      <router-link to="/space">Israel</router-link> 
      <router-link to="/space">France</router-link> 
    </nav>
  </div>
</template>

<script>
import { eventBusService } from './../services/event-bus.service.js';
export default {
  data() {
    return {
      hide: false,
    };
  },

  created() {
    eventBusService.$on('hideFooter', this.toggleFooter);
    eventBusService.$on('showFooter', this.toggleFooter);
  },

  methods: {
    toggleFooter() {
      console.log('test hide footer');
      this.hide = !this.hide;
    },
  },
};
</script>

<style></style>

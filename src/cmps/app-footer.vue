<template>
  <div class="app-footer" :class="{ hide }">
     <!-- <login
            v-if="isLoginOpen"
            @close-login="closeLogin"
            :formType="getLoginFormType"
          /> -->
    <nav>
      <router-link class="footer-item" to="/">Home</router-link> 
      <router-link to="/space">Explore</router-link> 
      <router-link to="/space/host/edit">Host your Home</router-link> 
      <router-link to="/about">about chatapp</router-link> 
      <router-link to="/dashboard">Dashboard</router-link> 
      <router-link to="/dashboard">Signup</router-link> 
      <!-- <div @click="openSignup" class="dashboard">Signup</div> -->
      <!-- <div @click="openLogin" class="dashboard">Login</div> -->
      <router-link to="/dashboard">Login</router-link> 
      <!-- <p @click="israel" class="dashboard">Israel</p> -->
      <!-- <div @click="france" class="dashboard">Israel</div> -->
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
      login:{
        isOpen: false,
        type: '',
      }
    }
  },
  created() {
    eventBusService.$on('hideFooter', this.toggleFooter);
    eventBusService.$on('showFooter', this.toggleFooter);
  },
  computed:{
    isLoginOpen(){return this.login.isOpen}
  },

  methods: {
    toggleFooter() {
      console.log('test hide footer');
      this.hide = !this.hide;
    },
    openLogin() {
      this.login.type = 'Login'
    },
    close
  },
};
</script>

<style></style>

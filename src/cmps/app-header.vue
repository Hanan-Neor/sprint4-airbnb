<template>
  <div class="app-header flex">
      <img class="logo"  src="../assets/img/logo.png" alt="">
      
      <p>Become a host</p>
      <space-filter />
      <button class="flex pointer" @click="toggleNav">
          <img class="hamburger" src="../assets/img/icons/hamburger.png" alt="">
          <img class="avatar" src="https://www.cnet.com/a/img/liJ9UZA87zs1viJiuEfVnL7YYfw=/940x0/2020/05/18/5bac8cc1-4bd5-4496-a8c3-66a6cd12d0cb/fb-avatar-2.jpg" alt="avatar">
      </button>
      <ul class="nav pointer clear-list" v-if="isNavOpen">
          <li @click="showLogin">login</li>
          <li @click="showLogin">signup</li>
          <li>Host your home</li>
      </ul>

  </div>


</template>

<script>
import spaceFilter from './space-filter.vue'
import login from './login.vue'

export default {
    components: {
        spaceFilter,
        login,
    },
    computed: {
        isLoginOpen(){
            return this.loginOpen
        },
        loggedInUser(){
        },
        isNavOpen(){
            return this.navOpen;
        }
    },
    data(){
        return {
            loginOpen:false,
            navOpen: false,
        }
    },
    methods:{
        showLogin(){
            this.loginOpen = true;
        },
        closeLogin(){
            this.loginOpen = false;
        },
        toggleNav(){
            this.navOpen = !this.navOpen
        }
    }
}
</script>

<style>

</style>
<template>
  <div class="app-header">
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/space">Explore</router-link> |
        <router-link to="/space/host/edit">add space</router-link> |
      </nav>
    <login v-if="isLoginOpen" @close-login="closeLogin"/>
    <button v-else @click="showLogin">login</button>
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
        }
    },
    data(){
        return {
            loginOpen:false,
        }
    },
    methods:{
        showLogin(){
            this.loginOpen = true;
        },
        closeLogin(){
            this.loginOpen = false;
        }
    }
}
</script>

<style>

</style>
<template>
  <!-- <div class="app-header flex" :style="diplayState"> -->
  <div class="app-header flex" :style="headerPos">
    <router-link to="/" class="logo-container clear-link" :style="logoStyle">

      <div class="logo"></div>
    </router-link>
    <!-- <div class="logo-container" :style="logoStyle" > -->
      <!-- <img v-if="isLarge" class="logo" src="../assets/img/icons/logo.svg" alt="" /> -->
      <!-- <img v-if="isLarge" class="logo" src="../assets/img/logo.png" alt="" /> -->
    <!-- </div> -->
    <div>
      <space-filter :style="searchPos" />
    </div>
    <div class="flex" style="align-items:center">

      <span v-if="isLarge" class="becomeHost" :style="hostColor">Become a host</span>
      <login v-if="isLoginOpen" @close-login="closeLogin" :formType="getLoginFormType"/>
      <template v-if="isLarge">
        <button class="flex pointer" @click="toggleNav">
          <img
            class="hamburger"
            src="../assets/img/icons/hamburger.png"
            alt=""
          />
          <img
            class="avatar"
            src="https://www.cnet.com/a/img/liJ9UZA87zs1viJiuEfVnL7YYfw=/940x0/2020/05/18/5bac8cc1-4bd5-4496-a8c3-66a6cd12d0cb/fb-avatar-2.jpg"
            alt="avatar"
          />
        </button>

        <ul class="nav pointer clear-list" v-if="isNavOpen">
          <li v-if="!loggedInUser" @click="showLogin('login')">login</li>
          <li v-if="!loggedInUser" @click="showLogin('signup')">signup</li>
          <li v-if="loggedInUser" @click="logout">logout</li>
          <li>Host your home</li>
        </ul>
      </template>

      <div v-if="!isLarge" class="bottom-nav">
        <div @click="showExplore" class="explore nav-item">
          <p class="text">explore</p>
        </div>
        <div @click="showLogin" class="nav-login nav-item">
          <p class="text">login</p>
        </div>
        <div @click="showWhishlist" class="wishlists nav-item">
          <p class="text">wishlists</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import spaceFilter from "./space-filter.vue";
import login from "./login.vue";
import { eventBusService } from "./../services/event-bus.service.js";

export default {
  created() {
    eventBusService.$on("headerFixed", (state) => {
      this.state = state;
    });
    eventBusService.$on("searchPos", (isIntersecting) => {
      this.isIntersecting = isIntersecting;
    });

    // },3000)
  },
  components: {
    spaceFilter,
    login,
  },
  computed: {
    getLoginFormType(){return this.loginFormType},
    isLoginOpen() {
      return this.loginOpen;
    },
    loggedInUser() {return this.$store.getters.loggedinUser },
    isNavOpen() {
      return this.navOpen;
    },
    isLarge() {
      return !this.$store.getters.isSmallScreen;
    },
    headerPos() {
      return {
        position: this.state ? "fixed" : "relative",
        background: this.isIntersecting ? "none" : "white",
        // color: this.isIntersecting ? 'white' : 'black',
        "z-index": 10,
      };
    },
    searchPos() {
      if (this.state) {
        return {
          position: "relative",
          top: this.isIntersecting ? "150px" : "unset",
          background: this.isIntersecting ? "none" : "white",
        };
      } else {
        return {
          position: "relative",
        };
      }
    },
    hostColor(){
      return {
        color: this.isIntersecting ? "white" : "inherit",
      }
    },
    logoStyle(){
      return {
        color: this.isIntersecting ? "white" : "#ff385c",
      }
    }
  },
  data() {
    return {
      loginFormType: '',
      loginOpen: false,
      navOpen: false,
      screenWidth: window.innerWidth,
      // diplayState:{
      //   position:'fixed'
      // }
      //state is false when nav is hidden
      state: false,
      // isIntersecting refers to background round 
      isIntersecting: true,
    };
  },
  methods: {
    logout(){ 
      this.$store.dispatch({type:'logout'})
      this.toggleNav();
      if (this.$route.name === 'space-details') this.$router.push('/');
      },
    showLogin(formType) {
      this.loginFormType = formType;
      this.loginOpen = true;
      this.toggleNav();
      console.log(this.isLoginOpen);
    },
    closeLogin() {
      this.loginOpen = false;
    },
    toggleNav() {
      this.navOpen = !this.navOpen;
    },
    showWhishlist() {
      alert("please add wishlists");
    },
    showExplore() {
      this.$store.commit({ type: "clearFilter"});
      if (this.$router.path !=='/space') this.$router.push("/space");
    },
  },
};
</script>

<style>
</style>
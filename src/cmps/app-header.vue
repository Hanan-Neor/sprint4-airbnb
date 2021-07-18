<template>
  <!-- <div class="app-header flex" :style="diplayState"> -->
  <div class="app-header flex" :style="headerPos">
    <div>
      <img v-if="isLarge" class="logo" src="../assets/img/logo.png" alt="" />
    </div>
    <div>
      <space-filter :style="searchPos" />
    </div>
    <div class="flex" style="align-items:center">
      <span v-if="isLarge">Become a host</span>
      <login v-if="isLoginOpen" @close-login="closeLogin" />
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
          <li @click="showLogin">login</li>
          <li @click="showLogin">signup</li>
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
    isLoginOpen() {
      return this.loginOpen;
    },
    loggedInUser() {},
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
          backgroung: this.isIntersecting ? "none" : "white",
        };
      } else {
        return {
          position: "relative",
        };
      }
    },
  },
  data() {
    return {
      loginOpen: false,
      navOpen: false,
      screenWidth: window.innerWidth,
      // diplayState:{
      //   position:'fixed'
      // }
      state: false,
      isIntersecting: true,
    };
  },
  methods: {
    showLogin() {
      console.log("logging in...");
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
      alert("what would you like to explore... coming soon...");
    },
  },
};
</script>

<style>
</style>
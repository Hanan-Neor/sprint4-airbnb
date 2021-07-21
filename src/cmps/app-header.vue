<template>
  <section>
    <!-- <div class="app-header flex" :style="diplayState"> -->
    <nav class="app-header  main-layout" :style="headerPos">
      <div class="container" style="justify-content:space-between; align-items:center">
      <router-link to="/" class="logo-container clear-link" :style="logoStyle">
        <div class="logo"></div>
      </router-link>
      <div>
        <space-filter :style="searchPos" />
      </div>

      <div class="flex" style="align-items: center">
        <span v-if="isLarge" class="becomeHost" :style="hostColor"
          >Become a host</span
        >

        <login
          v-if="isLoginOpen"
          @close-login="closeLogin"
          :formType="getLoginFormType"
         
        />
     
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

      <!-- <div class=" full"> -->

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
    </nav>
  </section>
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
    eventBusService.$on("likedWithoutUser", () => {
      this.showLogin();
      this.loginFormType = 'login'
      this.navOpen = false //TODO this should not be needed here - change 'showLogin()'
      // this.toggleNav(); 
    });

    // },3000)
  },
  components: {
    spaceFilter,
    login,
  },
  computed: {
    getLoginFormType() {
      return this.loginFormType;
    },
    isLoginOpen() {
      return this.loginOpen;
    },
    loggedInUser() {
      return this.$store.getters.loggedinUser;
    },
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
          // boxShadow: this.isIntersecting ?"none" :"inherit",
          'font-size': this.isIntersecting ? "1rem" : "0.875rem",
          // width: this.isIntersecting ? "fit-content" : "300px",
          position: this.isIntersecting ? "absolute":"relative",
          top: this.isIntersecting ? "150px" : "unset",
          left:this.isIntersecting ? "50%": "unset",
          transform:this.isIntersecting ? "translateX(-50%)": "unset",
          backgroung: this.isIntersecting ? "none" : "white",
        };
      } else {
        return {
          'font-size': "0.875rem",
          position: "relative",
          // width: "300px"
        };
      }
    },
    hostColor() {
      return {
        color: this.isIntersecting ? "white" : "inherit",
      };
    },
    logoStyle() {

      if (this.state) {

      return {
        color: this.isIntersecting ? "white" : "#ff385c",
      };
      }else{
        color: "#ff385c"
      }

    },
  },
  data() {
    return {
      loginFormType: "", //'login' or 'signup'
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
    logout() {
      this.$store.dispatch({ type: "logout" });
      this.toggleNav();
      if (this.$route.name === "space-details") this.$router.push("/");
    },
    showLogin(formType) {
      this.$store.dispatch({type:'showCover'})
      this.loginFormType = formType;
      this.loginOpen = true;
      this.toggleNav();
      // console.log(this.isLoginOpen);
    },
    closeLogin() {
      this.$store.dispatch({type:'hideCover'})
      this.loginOpen = false;
    },
    toggleNav() {
      this.navOpen = !this.navOpen;
    },
    showWhishlist() {
      alert("please add wishlists");
    },
    showExplore() {
      this.$store.commit({ type: "clearFilter" });
      if (this.$router.path !== "/space") this.$router.push("/space");
    },
  },
};
</script>

<style>
.header {
  position: fixed;
  display: flex;
}
</style>

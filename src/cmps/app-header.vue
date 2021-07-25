<template>
  <section :style="headerPos" style="width: 100%">
    <!-- <div class="app-header flex" :style="diplayState"> -->
    <div>
      <nav class="app-header header-nav-responsive" :class="{ hide }">
        <div class="container" style="">
          <router-link
            to="/"
            class="logo-container clear-link"
            :style="logoStyle"
          >
            <div class="logo">
              <span>travelbnb</span>
            </div>
          </router-link>

          <div
            class="open-filter-el-container"
            v-show="!showFilters"
            @click="showFilters = true"
          >
            <open-filter-el />
          </div>

          <div
            class="header-right-side-responsive"
            style="align-items: center; justify-self: end; grid-column: 3/4"
          >
            <span v-if="isLarge" class="becomeHost" :style="hostColor"
              >Become a host</span
            >
            <router-link
              :to="'/space'"
              v-if="isLarge"
              class="becomeHost explore"
              :style="hostColor"
              >Explore</router-link
            >

            <!-- <login
            v-if="isLoginOpen"
            @close-login="closeLogin"
            :formType="getLoginFormType"
          /> -->

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
                <li v-if="!loggedInUser" @click="showLogin('login')">
                  <span>login</span>
                </li>
                <li v-if="!loggedInUser" @click="showLogin('signup')">
                  <span>signup</span>
                </li>
                <li v-if="loggedInUser" @click="logout"><span>logout</span></li>
                <li><span>Host your home</span></li>
              </ul>
            </template>

            <!-- <div class=" full"> -->

            <!-- <div v-if="!isLarge" class="bottom-nav"> -->
          </div>

          <login
            v-if="isLoginOpen"
            @close-login="closeLogin"
            :formType="getLoginFormType"
          />

          <div class="bottom-nav">
            <router-link to="/" class="logo-container2 clear-link nav-item">
              <div class="logo2"></div>
              <p class="text">Home</p>
            </router-link>

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
          <!-- <div style="grid-area: 2/1/3/4;justify-self: center;">
          <space-filter :style="searchPos"  />

        </div> -->
        </div>
      </nav>
      <div class="app-header main-layout filter-container" v-if="showFilters">
        <!-- <space-filter :style="searchPos"  @toggleFilters="showFilters=false" /> -->
        <space-filter :style="filterBackground" @toggleFilters="toggleFilter" />
      </div>
    </div>
  </section>
</template>

<script>
import spaceFilter from './app-header/space-filter.vue';
import login from './app-header/login.vue';
import { eventBusService } from './../services/event-bus.service.js';
import OpenFilterEl from './app-header/open-filter-el.vue';

export default {
  created() {
    eventBusService.$on('hideHeader', this.toggleHeader);
    eventBusService.$on('showHeader', this.toggleHeader);
    eventBusService.$on('headerFixed', (state) => {
      this.state = state;

      if (this.isLarge) {
        this.showFilters = true;
      }
    });
    eventBusService.$on('searchPos', (isIntersecting) => {
      this.isIntersecting = isIntersecting;
      if (this.isLarge) {
        this.showFilters = isIntersecting;
      }
    });
    eventBusService.$on('likedWithoutUser', () => {
      this.showLogin();
      this.loginFormType = 'login';
      this.navOpen = false; //TODO this should not be needed here - change 'showLogin()'
      // this.toggleNav();
    });

    // },3000)
  },
  components: {
    spaceFilter,
    login,
    OpenFilterEl,
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
        position: this.state ? 'fixed' : 'relative',
        background: this.isIntersecting ? 'none' : 'white',
        'z-index': 10,
      };
    },
    filterBackground() {
      return {
        background: this.isIntersecting ? '#fff' : 'rgb(247, 247, 247)',
      };
    },
    hostColor() {
      return {
        color: this.isIntersecting ? 'white' : 'inherit',
      };
    },
    logoStyle() {
      if (this.state) {
        return {
          color: this.isIntersecting ? 'white' : '#ff385c',
        };
      } else {
        color: '#ff385c';
      }
    },
  },
  data() {
    return {
      loginFormType: '', //'login' or 'signup'
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
      hide: false,
      showFilters: false,
    };
  },
  methods: {
    toggleFilter() {
      // if (!this.isIntersecting) {
      this.showFilters = false;
      // this.$store.dispatch({ type: 'showCover' });
      // }
    },
    logout() {
      this.$store.dispatch({ type: 'logout' });
      this.toggleNav();
      if (this.$route.name === 'space-details') this.$router.push('/');
    },
    showLogin(formType) {
      this.$store.dispatch({ type: 'showCover' });
      this.loginFormType = formType;
      this.loginOpen = true;
      this.toggleNav();
      // console.log(this.isLoginOpen);
    },
    closeLogin() {
      this.$store.dispatch({ type: 'hideCover' });
      this.loginOpen = false;
    },
    toggleNav() {
      this.navOpen = !this.navOpen;
    },
    showWhishlist() {
      alert('please add wishlists');
    },
    showExplore() {
      this.$store.commit({ type: 'clearFilter' });
      if (this.$router.path !== '/space') this.$router.push('/space');
    },
    toggleHeader() {
      this.hide = !this.hide;
    },
  },
  //   mounted() {
  //   document.addEventListener("click", this.close);
  // },
  // beforeDestroy() {
  //   document.removeEventListener("click", this.close);
  // },
};
</script>

<style>
.header {
  position: fixed;
  display: flex;
}
</style>

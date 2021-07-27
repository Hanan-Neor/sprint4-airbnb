<template>
  <section :style="headerPos" style="width: 100%;
  box-shadow: 0 10px 10px -10px rgba(33, 35, 38, 0.1);
  ">
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
          <!-- <div class="logo3">

            <img style="width:100%" src="@/assets/img/logo/logo3.png"/>
          </div> -->

          </router-link>

          <div
            class="open-filter-el-container"
            style="position:relative"
            @click="showFiltersFunc"
          >
          <div class="duplicate-for-observer fakeButton"
          :class="{ hideFakeButton: showFilters }"></div>
            <open-filter-el  v-if="!showFilters"/>
          </div>

          <div
            class="header-right-side-responsive"
            style="align-items: center; justify-self: end; grid-column: 3/4"
          >
            <span
              v-if="isLarge"
              class="becomeHost"
              :style="hostColor"
              @click="gotoAddSpace"
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
                  v-if="loggedInUser"
                  class="avatar"
                  :src="loggedInUser.imgUrl"
                  alt="avatar"
                />
                <img
                  v-else
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
                <li @click="gotoAddSpace"><span>Host your home</span></li>
              </ul>
            </template>

            <!-- <div class=" full"> -->

            <!-- <div v-if="!isLarge" class="bottom-nav"> -->
          </div>

          <login
            v-if="isLoginOpen"
            @close-login="closeLogin"
            :formType="getLoginFormType"
            :showFilters2="showFilters"
          />

          <div class="bottom-nav">
            <router-link to="/" class="logo-container2 clear-link nav-item">
              <div class="logo2"></div>
              <!-- <div > -->
            <!-- <img class="logo3 footer" src="@/assets/img/logo/logo3.png" style="" /> -->
              <!-- </div> -->

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
      this.navOpen = false;
    });
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
      state: false,
      isIntersecting: true,
      hide: false,
      showFilters: false,
    };
  },
  methods: {
    showFiltersFunc(){
      this.showFilters = true
      // this.$store.commit('headerButtonStage',true)
      // this.$store.dispatch({ type: 'headerButtonStage' , x:true})
      // console.log(this.showFilters);
    },
    gotoAddSpace(){
      this.$router.push('/space/host/edit')
    },
    toggleFilter() {
      // alert('hi from toggle')
      this.showFilters = false;
      // this.$store.commit('headerButtonStage',false)
      // this.$store.dispatch({ type: 'headerButtonStage' , x:false})


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

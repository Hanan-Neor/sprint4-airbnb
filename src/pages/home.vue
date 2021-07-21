<template>
  <div class="home">
    <div class="full" style="position:relative">
      <img
        class="top-bg full"
        src="https://res.cloudinary.com/dymtestxz/image/upload/v1626437274/sprint4/homePage/57b9f708-bb12-498c-bc33-769f8fc43e63_gnsppx.webp"
        alt=""
      />
      <h3 class="flexible-title">Not sure where to go? Perfect.</h3>
      <div class="background">
        <a class="header-image-button" @click="gotoSpaces">
          I'm flexible
        </a>
      </div>
    </div>

    <space-list :spaces="spaces" />
    <div class="breaker-image">
      <button class="breaker-image-btn" @click="showPage">
        Get Inspired/host
      </button>
      <img
        src="https://a0.muscache.com/im/pictures/f0343d6a-328c-4213-90a2-13ba3572a01f.jpg?im_w=320"
        alt=""
      />
    </div>
    <explore-list @gotoSpaces="gotoCountrySpaces" :spaces="spaces" />
  </div>
</template>

<script>
import spaceList from './../cmps/space-app/space-list.vue';
import exploreList from './../cmps/explore-list.vue';
import { eventBusService } from './../services/event-bus.service.js';
import msg from './../cmps/msg.vue';
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    spaceList,
    exploreList,
    msg,
  },
  created() {
    this.$store.commit({ type: 'clearFilter' });
    this.$store.commit({ type: 'setFilterField', field: 'count', value: 4 });
    this.$store.dispatch({ type: 'loadSpaces' });
    console.log('spaces in home', this.$store.getters.spaces);
    eventBusService.$emit('headerFixed', true);
    // eventbus.$emit('headerFixed', true)

    setTimeout(() => {
      // const sectionOne = document.querySelector(".app-header")
      const sectionOne = document.querySelector('.top-bg');
      const options = {
        // root:null,
        threshold: 1,
        rootMargin: '0px',
      };

      const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach((entry) => {
          // console.log(entry);
          // console.log(entry.isIntersecting);
          eventBusService.$emit('searchPos', entry.isIntersecting);
        });
      }, options);

      observer.observe(sectionOne);
    }, 1000);
  },
  destroyed() {
    eventBusService.$emit('headerFixed', false);
    // eventbus.$emit('headerFixed' , false)

    // eventBusService.$off('headerFixed');
  },
  computed: {
    spaces() {
      return this.$store.getters.spaces;
    },
  },
  methods: {
    async gotoCountrySpaces(country) {
      this.$store.commit({
        type: 'setFilterField',
        field: 'country',
        value: country,
      });
      this.gotoSpaces();
    },
    async gotoSpaces() {
      try {
        this.$router.push('/space');
      } catch (err) {
        console.log('error in store moving to space-app from homepage', err);
        throw err;
      }
    },
    showPage() {
      prompt('show host or explore page...');
    },
  },
};
</script>

<style></style>

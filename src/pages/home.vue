<template>
  <div class="home">
    <div class="full" style="position: relative">
      <img
        class="top-bg"
        src="https://res.cloudinary.com/dymtestxz/image/upload/v1627221063/sprint4/jaunathan-gagnon-nlwzdkRd-Hw-unsplash_uuhacf.jpg"
        alt=""
      />
      <!-- <img
        class="top-bg"
        src="https://sumberkimahill.com/wp-content/uploads/2019/01/Villa-Bali-Sea-view-Sumberkima-Hill-Retreat.JPG.jpg"
        alt=""
      /> -->
      <!-- <img
        class="top-bg full"
        src="https://res.cloudinary.com/dymtestxz/image/upload/v1626437274/sprint4/homePage/57b9f708-bb12-498c-bc33-769f8fc43e63_gnsppx.webp"
        alt=""
      /> -->
      <h3 class="flexible-title">Not sure where to go? Perfect.</h3>
      <div class="background" @click="gotoSpaces">
        <a class="header-image-button"> Explore new places </a>
      </div>
    </div>

    <div class="list-container full">
      <div class="list-titles">Discover locations</div>
      <explore-list @gotoSpaces="gotoCountrySpaces" :spaces="spaces" />
    </div>

    <div class="breaker-image">
      <button class="breaker-image-btn" @click="showAddSpace">
        <!-- Get Inspired/host -->
        Try hosting
      </button>
      <img
        class=""
        src="https://www.wns.co.za/Portals/0/Images/HeaderBanner/desktop/1087/53/travel_HD.jpg"
        alt=""
      />
      <!-- <img
        src="https://a0.muscache.com/im/pictures/f0343d6a-328c-4213-90a2-13ba3572a01f.jpg?im_w=320"
        alt=""
      /> -->
    </div>

    <div class="list-container full">
      <div class="list-titles">Top rated spaces</div>
      <space-list :spaces="spaces" />
    </div>
<!-- <date-picker /> -->
  </div>


</template>

<script>

import datePicker from "./../cmps/date-picker.vue"
import spaceList from "./../cmps/space-app/space-list.vue";
import exploreList from "./../cmps/explore-list.vue";
import { eventBusService } from "./../services/event-bus.service.js";
import msg from "./../cmps/msg.vue";
// @ is an alias to /src

export default {
  name: "Home",
  components: {
    spaceList,
    exploreList,
    msg,
    datePicker,
  },
  computed: {
    spaces() {
      return this.$store.getters.spaces;
    },
  },
  methods: {
    async gotoCountrySpaces(country) {
      this.$store.commit({
        type: "setFilterField",
        field: "country",
        value: country,
      });
      this.gotoSpaces();
    },
    async gotoSpaces() {
      try {
        this.$router.push("/space");
      } catch (err) {
        console.log("error in store moving to space-app from homepage", err);
        throw err;
      }
    },
    showAddSpace() {
      this.$router.push('/space/host/edit');
    },
  },




  mounted() {
    const sectionOne = document.querySelector(".top-bg");
    const options = {
      threshold: 1,
      rootMargin: "0px",
    };
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        eventBusService.$emit("searchPos", entry.isIntersecting);
      });
    }, options);
    observer.observe(sectionOne);
  },






  created() {
    this.$store.commit({ type: "clearFilter" });
    this.$store.commit({ type: "setFilterField", field: "count", value: 4 });
    this.$store.dispatch({ type: "loadSpaces" });
    console.log("spaces in home", this.$store.getters.spaces);
    eventBusService.$emit("headerFixed", true);
  },
  destroyed() {
    eventBusService.$emit("headerFixed", false);
  },
};
</script>

<style></style>

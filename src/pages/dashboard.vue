<template>
  <section>
    <div class="back-office ">
      <!-- <h1 v-if="host">Host dashboard: {{ host.fullname }}</h1> -->
      <!-- <div class="stats flex">
      <p>average rating: {{ averageRating }}</p>
      <p>total guests: {{ totalGuests }}</p>
      <p>% occupancy {{ occupancy }}</p>
      <p>total likes: {{ totalLikes }}</p>
    </div> -->
      <!-- <host-stats/> -->
      <!-- <order-chart
      class="dashboard-chart"
      v-if="ready"
      :spaceNames="spaceNames"
      :spaceRatings="spaceRatings"
    /> -->

      <!-- <review-chart
      class="dashboard-chart"
      v-if="ready"
      :spaceNames="spaceNames"
      :spaceRatings="spaceRatings"
    /> -->
      <host-profile class="host-profile" :host="host"></host-profile>
      <!-- <div class="bar">
        <button class="bar-item bar-button" @click="openSection('orders')">
          Orders
        </button>
        <button class="bar-item bar-button" @click="openSection">Spaces</button>
        <button class="bar-item bar-button" @click="openSection">
          Statitics
        </button>
      </div> -->
      <!-- <host-space-list
        class="host-order-list"
        :host="host"
        :mySpaces="spaces"
      /> -->
      <host-order-list class="host-order-list" :class="{ hide }" :host="host" />
    </div>
    <img
      class="bottom-image full"
      src="https://res.cloudinary.com/dymtestxz/image/upload/v1626975119/sprint4/cd29ad57-8934-4075-9d5c-6578863fb1dd_jeyprh.webp"
      alt=""
    />
  </section>
</template>

<script>
import hostSpaceList from '../cmps/backoffice/host-space-list.vue';
import hostOrderList from '../cmps/backoffice/host-order-list.vue';
import hostStats from '../cmps/backoffice/host-stats.vue';
import orderChart from '../cmps/backoffice/order-chart.vue';
import reviewChart from '../cmps/backoffice/review-chart.vue';
import hostProfile from '../cmps/backoffice/host-profile.vue';

export default {
  name: 'dashboard',
  components: {
    hostSpaceList,
    hostOrderList,
    hostStats,
    reviewChart,
    orderChart,
    hostProfile,
  },
  data() {
    return {
      ready: false,
      hide: false,
    };
  },
  computed: {
    host() {
      return this.$store.getters.loggedinUser;
    },
    averageRating() {
      return this.$store.getters.getAverageRating;
    },
    totalGuests() {
      return this.$store.getters.totalGuests;
    },
    totalSpaceCapacity() {
      return this.$store.getters.totalSpaceCapacity;
    },
    occupancy() {
      return this.totalGuests / this.totalSpaceCapacity || 0;
    },
    totalLikes() {
      return this.$store.getters.totalLikes;
    },
    spaces() {
      return this.$store.getters.spaces;
    },

    spaceRatings() {
      return this.$store.getters.spaceRatings;
    },
    spaceNames() {
      return this.$store.getters.spaceNames;
    },
  },
  async created() {
    try {
      const loggedinUser = await this.$store.dispatch({
        type: 'loadLoggedInUser',
      });
      const hostId = loggedinUser._id;
      await this.$store.commit({ type: 'clearFilter' });
      await this.$store.commit({
        type: 'setFilterField',
        field: 'hostId',
        value: hostId,
      });
      await this.$store.dispatch({ type: 'loadSpaces' });
      this.ready = true;
    } catch (err) {
      console.log('error getting host in dashboard');
      throw err;
    }
  },
};
</script>

<style>
/* .backoffice .stats p {
  border: 1px solid black;
  margin-right: 5px;
  padding: 5px;
} */
/* canvas {
  height: 60vh;
} */
</style>

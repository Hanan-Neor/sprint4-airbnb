<template>
<<<<<<< HEAD
  <div class="backoffice">
      <chatbox />
      <h1 v-if="host">Host dashboard: {{host.fullname}} </h1>
      <div class="stats flex">
          <p>average rating: {{averageRating}}</p> 
           <p>total guests: {{totalGuests}}</p>
            <p>% occupancy {{occupancy}} </p>
            <p>total likes: {{totalLikes}}</p>
          </div>
      <host-stats  />
      <!-- <order-chart /> -->
       <order-chart class="dashboard-chart" v-if="ready" :spaceNames="spaceNames" :spaceRatings="spaceRatings" />
      <host-space-list :host="host" :mySpaces="spaces"/>
      <review-chart class="dashboard-chart" v-if="ready" :spaceNames="spaceNames" :spaceRatings="spaceRatings"/>
=======
  <div class="backoffice ">
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
    <!-- <host-space-list :host="host" :mySpaces="spaces" /> -->
    <!-- <review-chart
      class="dashboard-chart"
      v-if="ready"
      :spaceNames="spaceNames"
      :spaceRatings="spaceRatings"
    /> -->
>>>>>>> 06ef2b182280f257aad8c38c83875fa4b21d60e3
    <host-order-list :host="host" />
  </div>
</template>

<script>
<<<<<<< HEAD
import hostSpaceList from '../cmps/backoffice/host-space-list.vue'
import hostOrderList from '../cmps/backoffice/host-order-list.vue'
import hostStats from '../cmps/backoffice/host-stats.vue'
import orderChart from '../cmps/backoffice/order-chart.vue'
import reviewChart from '../cmps/backoffice/review-chart.vue'
import chatbox from '../cmps/chatbox.vue'

export default {
    name: 'dashboard',
    components:{
        hostSpaceList,
        hostOrderList,
        hostStats,
        reviewChart,
        orderChart,
        chatbox,
=======
import hostSpaceList from '../cmps/backoffice/host-space-list.vue';
import hostOrderList from '../cmps/backoffice/host-order-list.vue';
import hostStats from '../cmps/backoffice/host-stats.vue';
import orderChart from '../cmps/backoffice/order-chart.vue';
import reviewChart from '../cmps/backoffice/review-chart.vue';

export default {
  name: 'dashboard',
  components: {
    hostSpaceList,
    hostOrderList,
    hostStats,
    reviewChart,
    orderChart,
  },
  data() {
    return {
      ready: false,
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
>>>>>>> 06ef2b182280f257aad8c38c83875fa4b21d60e3
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
.backoffice .stats p {
  border: 1px solid black;
  margin-right: 5px;
  padding: 5px;
}
canvas {
  height: 60vh;
}
</style>

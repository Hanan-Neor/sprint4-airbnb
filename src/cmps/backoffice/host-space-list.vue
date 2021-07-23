<template>
  <div class="host-space-list">
    <ul class="clear-list">
      <li v-for="space in spaces" :key="space._id" class="host-space-item">
        <div class="cover-photo">
          <img :src="space.imgUrls[0]" />
        </div>
        <p class="space-name">{{ space.name }}</p>
        <p class="space-address">{{ space.loc.address }}</p>
        <div class="host-space-details">
          <div class="rating">
            4.0 • (6) reviews
          </div>
          •
          <div class="price"><span> $133</span> / night</div>
        </div>
        <div class="space-panel">
          <button class="edit"></button>
        </div>
      </li>
    </ul>
    <!-- <order-chart v-if="spaceRatings && spaceRatings.length" :spaceNames="spaceNames" :spaceRatings="spaceRatings" /> -->
    <!-- <h2>space list</h2>
    <ul>
      <li v-for="space in spaces" :key="space._id" class="flex">
        {{ space.name }} by {{ space.host.fullname }} -->
    <!-- {{space._id}} -->
    <!-- <button @click="deleteSpace(space)">delete</button>
        <button @click="editSpace(space)">edit</button>
      </li>
    </ul>-->
    <!-- <router-link :to="'/space/host/edit'">add a new space</router-link> -->
  </div>
</template>

<script>
// import {filterService } from './../../services/filterFunctions.js'
import orderChart from './order-chart.vue';

export default {
  components: {
    orderChart,
  },
  props: ['host', 'mySpaces'],
  data() {
    return {
      // spaces: {}
    };
  },
  async created() {
    try {
      const spaces = await this.getSpacesForHost(); //loads spaces in the store
      // console.log('spaceRatings', this.spaceRatings);
      // const host = await this.$store.state.loggedinUser;
      // console.log('host', host);
      //TODO clear space filters
    } catch (err) {
      console.log('error getting host in dashboard');
      throw err;
    }
  },
  computed: {
    spaces() {
      return this.mySpaces;
      return this.$store.getters.spaces;
    },
  },
  methods: {
    //TODO move this function to a store
    async getSpacesForHost() {
      try {
        const hostId = this.host._id;
        await this.$store.commit({ type: 'clearFilter' });
        await this.$store.commit({
          type: 'setFilterField',
          field: 'hostId',
          value: hostId,
        });
        await this.$store.dispatch({ type: 'loadSpaces' });
        return this.$store.getters.spaces;
      } catch (err) {
        console.log('getSpacesForHost', err);
        throw err;
      }
    },
    async deleteSpace(space) {
      try {
        await this.$store.dispatch({ type: 'removeSpace', spaceId: space._id });
        await this.$store.dispatch({ type: 'loadSpaces' });
      } catch (err) {
        console.log('getSpacesForHost', err);
        throw err;
      }
    },
    async editSpace(space) {
      //TODO remove these 2 lines when have edit form
      const newName = prompt('enter new name');
      space.name = newName;
      try {
        const savedSpace = await this.$store.dispatch({
          type: 'saveSpace',
          space,
        });
        console.log('savedSpace', savedSpace);
      } catch (err) {
        console.log('getSpacesForHost', err);
        throw err;
      }
    },
  },
};
</script>

<style></style>

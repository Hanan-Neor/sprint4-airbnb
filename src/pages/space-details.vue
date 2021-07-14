<template>
  <div class="space-details">
    <h2 class="space-title-primary">{{ space.name }}</h2>
    <div class="space-title-secondary">
      <div class="rating">
        <p class="total-rate">{{ totalRate }}</p>
        <p class="number-reviews">({{ numOfReviews }})</p>
      </div>
      <div class="save-space">Save</div>
    </div>
    <space-imgs :imgUrls="space.imgUrls" />

    <div class="space-description-container">
      <div class="space-description-wrap">
        <div class="space-description-title">
          <p class="title-sentence">
            Entire {{ space.type }}, hosted by {{ host.fullname }}
          </p>
          <img class="host-avatar" :src="host.imgUrl" alt="" />
        </div>
        <div class="space-description">{{ space.description }}</div>
        <div class="space-ameneties">
          <ul class="space-ameneties-list">
            <li
              v-for="(amenity, idx) in space.amenities"
              :key="idx"
              class="amenity-item"
            >
              {{ amenity }}
            </li>
          </ul>
        </div>
        <!-- <review-list :reviews="space.reviews"></review-list> -->
      </div>
      <!-- <reserve-space/> -->
    </div>
    <div class="map-container">
      <p class="map-title">Where you'll be</p>
      <p class="space-location">{{ space.loc.address }}</p>
      <!-- <map-cmp></map-cmp> -->
    </div>
    <pre>{{ space }}</pre>
  </div>
</template>

<script>
import chatApp from './../cmps/space-details/chat-app.vue';
import orderForm from './../cmps/space-details/order-form.vue';
import reviewList from './../cmps/space-details/review-list.vue';
import spaceImgs from './../cmps/space-details/space-imgs.vue';

import { spaceService } from '../services/space.service.js';

export default {
  name: 'space-details',

  data() {
    return {
      space: {
        loc: {},
        reviews: [],
      },
      host: {},
    };
  },

  computed: {
    totalRate() {
      const sum = this.space.reviews.reduce((acc, r) => {
        return (acc += r.rate);
      }, 0);
      return sum / this.space.reviews.length;
    },

    numOfReviews() {
      return this.space.reviews.length;
    },
  },

  watch: {
    '$route.params.spaceId': {
      immediate: true,
      async handler() {
        const { spaceId } = this.$route.params;
        try {
          const space = await spaceService.getById(spaceId);
          console.log(space);
          this.space = space;
          this.host = space.host;
        } catch (error) {
          console.log('cannot get space', space);
        }
      },
    },
  },
  methods: {},
  components: {
    chatApp,
    orderForm,
    reviewList,
    spaceImgs,
  },
};
</script>

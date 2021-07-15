<template>
  <div class="space-details main-layout">
    <h2 class="space-title-primary">{{ space.name }}</h2>
    <div class="space-title-secondary">
      <div class="left-part">
        <div class="rating">
          <!-- <img class="star-icon" src="../assets/icons/star.svg" alt="" /> -->
          <p class="total-rate">{{ totalRate }}</p>
          <p class="number-reviews">({{ numOfReviews }} reviews)</p>
        </div>
        <span>•</span>
        <div class="space-location">
          {{ space.loc.address }}
        </div>
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
          <img class="avatar" :src="host.imgUrl" alt="" />
        </div>
        <div class="space-description">
          {{ space.description }}
        </div>
        <div class="space-ameneties">
          <p class="ameneties-title">What this place offers</p>
          <ul class="space-ameneties-list clear-list">
            <li
              v-for="(amenity, idx) in space.amenities"
              :key="idx"
              class="amenity-item"
              :class="icon(amenity)"
            >
              {{ amenity }}
            </li>
          </ul>
        </div>
      </div>
      <!-- <reserve-space/> -->
      <div class="reserve-space">HIIII</div>
    </div>
    <review-list :reviews="space.reviews"></review-list>

    <div class="map-container">
      <p class="map-title">Where you'll be</p>
      <google-maps></google-maps>
      <p class="space-location">{{ space.loc.address }}</p>
    </div>
    <!-- <pre>{{ space }}</pre> -->
  </div>
</template>
<script>
import chatApp from './../cmps/space-details/chat-app.vue';
import orderForm from './../cmps/space-details/order-form.vue';
import reviewList from './../cmps/space-details/review-list.vue';
import spaceImgs from './../cmps/space-details/space-imgs.vue';
import googleMaps from './../cmps/google-maps.vue';
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

    // icon(amenity) {
    //   console.log('hi');
    //   return;
    // },
  },

  methods: {
    icon(amenity) {
      return amenity.toLowerCase().replace(' ', '-');
    },
  },

  watch: {
    '$route.params.spaceId': {
      immediate: true,
      async handler() {
        const { spaceId } = this.$route.params;
        try {
          const space = await spaceService.getById(spaceId);
          this.space = space;
          this.host = space.host;
        } catch (error) {
          console.log('cannot get space', space);
        }
      },
    },
  },
  components: {
    chatApp,
    orderForm,
    reviewList,
    spaceImgs,
    googleMaps,
  },
};
</script>

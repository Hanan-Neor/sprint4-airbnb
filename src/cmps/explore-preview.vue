<template>
  <section class="space-preview" @click="gotoSpaces">
    <!-- <router-link :to="'/space/'"> -->
    <home-carousel >
      <carousel-slide
      
        v-for="(slide, idx) in slides"
        :key="idx"
        class="carousel-slider"
      >
        <img :src="slide" :alt="slide" />
      </carousel-slide>
    </home-carousel>

    <div class="name-price flex">
      <!-- <div>{{ explore.name }}</div> -->
      <div>
        {{ explore.loc.country }}
      </div>
    </div>
    <div class="distance">{{ distance }} kilometers away</div>

    <!-- </router-link> -->
  </section>
</template>

<script>
import homeCarousel from './space-app/home-carousel.vue';
import carouselSlide from './space-app/carouselSlide';
export default {
  name: '',
  props: ['explore'], //todo send a locations from explores in parent element
  data() {
    return {
      picIdx: 0,
      isLiked: false,
      distance: 0,
      slides: this.explore.imgUrls,
    };
  },
  methods: {
    prevPic() {
      if (this.picIdx === 0) this.picIdx = this.explore.imgUrls.length - 1;
      else this.picIdx--;
    },
    nextPic() {
      // alert('hi')
      if (this.picIdx === this.explore.imgUrls.length - 1) this.picIdx = 0;
      else this.picIdx++;
    },
    gotoSpaces() {
      this.$emit('gotoSpaces', this.explore.loc.country);
    },
  },
  computed: {
    imgForDisplay() {
      return this.explore.imgUrls[this.picIdx];
    },
    imgsForDisplay() {
      return this.explore.imgUrls;
    },
    distanceToShow() {
      return navigator.geolocation.getCurrentPosition(
        (position) => {
          //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
          const Lat1 = position.coords.latitude;
          const Lat2 = this.explore.loc.lat;
          const Lon1 = position.coords.longitude;
          const Lon2 = this.explore.loc.lng;

          // console.log(Lat1, Lat2, Lon1, Lon2);

          let R = 6371; // km
          let dLat = ((Lat2 - Lat1) * Math.PI) / 180;
          let dLon = ((Lon2 - Lon1) * Math.PI) / 180;
          let lat1 = (Lat1 * Math.PI) / 180;
          let lat2 = (Lat2 * Math.PI) / 180;

          let a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) *
              Math.sin(dLon / 2) *
              Math.cos(lat1) *
              Math.cos(lat2);
          let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          let d = R * c;
          // console.log(d);

          // this.distance = (Math.sqrt((position.coords.latitude - this.explore.loc.lat)**2+(position.coords.longitude-this.explore.loc.lng)**2))
          // d = d * 6371;
          this.distance = d.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          });
        },
        (err) => {
          console.log(err);
        }
      );
    },
  },
  components: {
    carouselSlide,
    homeCarousel,
  },
  created() {
    this.distanceToShow;
  },
};
</script>
<style scoped lang="scss"></style>

<style>
.app {
  display: flex;
  justify-content: center;
}
.carousel {
  border-radius: 12px;
}

.carousel-slider img {
  object-fit: cover;
  height: 100%;
}
</style>

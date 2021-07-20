<template>
  <section class="space-preview">
    <router-link :to="'/space/' + space._id">

      <svg
        @click.prevent="like"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        :style="{
          fill: likeColor,
          height: '25px',
          width: '25px',
          stroke: 'rgb(255, 255, 255)',
          'stroke-Width': 2,
        }"
      >
        <path
          d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"
        ></path>
      </svg>

      <!-- <div class="img-container">
        <img :src="`${imgForDisplay}`" />
      </div> -->
      <carousel>
        <carousel-slide
          v-for="slide in slides"
          :key="slide"
          class="carousel-slider"
        >
          <img :src="slide" :alt="slide" />
        </carousel-slide>
      </carousel>
      <!-- {{ islikedByUser }} -->



      <div class="name-price flex">
        <div>
          {{ space.loc.address }}
        </div>
        <div>{{ priceToShow }} / night</div>
      </div>
      <div class="distance">{{ distance }} kilometers away</div>

      <!-- <div class="stars"></div>
      <div class="type-adress">{{space.type}} ∙ {{space.loc.address}}</div>
      <div class="name">{{space.name}}</div>
      <div class="price">{{ priceToShow }} / night</div> -->





    </router-link>
  </section>
</template>

<script>
import carousel from './carousel';
import carouselSlide from './carouselSlide';
import { eventBusService } from './../../services/event-bus.service.js';

export default {
  name: '',
  props: ['space'], //TODO convert to object
  data() {
    return {
      picIdx: 0,
      // isLiked: true,
      isLiked: this.isliked2(),
      distance: 0,
      // likeColor: 'rgba(0, 0, 0, 0.5)',
      // likeColor: 'rgb(255, 56, 92)'

      slides: this.space.imgUrls,
    };
  },
  // watch:{
  //     isLiked(){
  //       this.isLiked = this.islikedByUser ? true : false;
  //     }

  // },
  methods: {
      isliked2(){
        // this.isLiked = this.islikedByUser
    this.isLiked = this.islikedByUser ? true : false;

      },
    like() {
      const user = this.$store.getters.loggedinUser;
      if(!user) {
        eventBusService.$emit('likedWithoutUser');
        return
      }
      this.isLiked = !this.isLiked;
      // if(!user) return alert('no user!')

      if (this.isLiked) {
        // this.likeColor = 'rgb(255, 56, 92)';
        user.likedSpacesIds.push(this.space._id);
      } else {
        // this.likeColor = 'rgba(0, 0, 0, 0.5)';
        const idx = user.likedSpacesIds.findIndex((spaceId) => {
          return spaceId === this.space._id;
        });
        user.likedSpacesIds.splice(idx, 1);
      }
      this.$store.dispatch({ type: 'updateUser', user });
    },
    prevPic() {
      if (this.picIdx === 0) this.picIdx = this.space.imgUrls.length - 1;
      else this.picIdx--;
    },
    nextPic() {
      if (this.picIdx === this.space.imgUrls.length - 1) this.picIdx = 0;
      else this.picIdx++;
    },
  },
  computed: {
    likeColor(){
      // const user = this.$store.getters.loggedinUser;
      if (!this.$store.getters.loggedinUser) return 'rgba(0, 0, 0, 0.5)'
    // return (user.likedSpacesIds.includes(this.space._id))? 'rgb(255, 56, 92)' : 'rgba(0, 0, 0, 0.5)'
    return (this.$store.getters.loggedinUser.likedSpacesIds.includes(this.space._id))? 'rgb(255, 56, 92)' : 'rgba(0, 0, 0, 0.5)'
    },
    islikedByUser() {
      const user = this.$store.getters.loggedinUser;
      if(!user) return
      return user.likedSpacesIds.includes(this.space._id);
    },
    imgForDisplay() {
      return this.space.imgUrls[this.picIdx];
    },
    imgsForDisplay() {
      return this.space.imgUrls;
    },
    distanceToShow() {
      return navigator.geolocation.getCurrentPosition(
        (position) => {
          //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
          const Lat1 = position.coords.latitude;
          const Lat2 = this.space.loc.lat;
          const Lon1 = position.coords.longitude;
          const Lon2 = this.space.loc.lng;

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

          // this.distance = (Math.sqrt((position.coords.latitude - this.space.loc.lat)**2+(position.coords.longitude-this.space.loc.lng)**2))
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
      // return
      // navigator.geolocation.getCurrentPosition(sucssessCb,errorCb)
    },
    priceToShow() {
      return this.space.price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        // useGrouping:true,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    },
  },
  components: {
    carouselSlide,
    carousel,
  },
  created() {
    this.isLiked = this.islikedByUser ? true : false;
    // this.likeColor = ''
    // if(this.isLiked) this.likeColor = 'rgb(255, 56, 92)'
    // this.like()
    this.distanceToShow;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style>
.app {
  display: flex;
  justify-content: center;
}
.carousel {
  border-radius: 12px;
  /* height: 100%; */

  /* position: relative;
  overflow: hidden;
  width:100%;
  height: 227px; */
  /* z-index: 10; */
  /* margin-bottom: 10px; */
}
.carousel-slider img {
  /* border-radius: 12px; */

  /* width: 100%; */
  object-fit: cover;
  height: 100%;
}
</style>

<template>
  <div class="space-details main-layout" v-if="space.imgUrls">
    <h2 class="space-title-primary">{{ space.name }}</h2>
    <!-- details page: {{getMsg}}  -->

    <msg :spaceId="spaceId" :msg="getMsg" v-if="showViewers" />
    <div class="space-title-secondary">
      <div class="left-part">
        <div class="rating">
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

    <!-- for mobile -->
      <space-list :spaces="[space]" />
<!-- / -->


    <div class="space-description-container">
      <div class="space-description-wrap">
        <div class="space-description-title">
          <div class="container">
            <p class="title-sentence">
              <span>{{ space.type }}</span><span> hosted by {{ host.fullname }}</span>
            </p>
            <p class="title-capacity">{{ space.capacity }} guests</p>
          </div>
          <img class="avatar" :src="host.imgUrl" alt="" />
        </div>

        <show-more
          :text="space.description"
          class="space-description"
        ></show-more>
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

      <space-reserve
        :space="space"
        :rate="totalRate"
        :reviews="numOfReviews"
        @reserve="reserveToSave"
      />
    </div>
    <div class="reviews-container">
      <div class="rating">
        <p class="total-rate star">{{ totalRate }}</p>
        <span>•</span>
        <p class="number-reviews">({{ numOfReviews }})</p>
      </div>
      <ul class="rate-categories-list clear-list">
        <li
          class="rate-categories-item"
          v-for="(r, c, idx) in categoryRate"
          :key="idx"
        >
          <div class="category-title">{{ c }}:</div>
          <div class="box">
            <div class="category-bar-container">
              <div class="category-bar" :style="{ width: r * 20 + '%' }"></div>
            </div>
            <div class="category-rate">{{ r.toFixed(1) }}</div>
          </div>
        </li>
      </ul>
      <review-list :reviews="reviewsToShow"></review-list>
    </div>

    <div class="map-container" v-if="this.space.loc.lat">
      <p class="map-title">Where you'll be</p>
      <google-maps :loc="space.loc" v-if="space.loc.lat"></google-maps>
      <div class="" v-else>loading</div>
      <p class="space-location">{{ space.loc.address }}</p>
    </div>
    <chat-app :space="space" />
  </div>
  <div v-else>
    <img class="svg-img-loader" src="@/assets/img/loading.svg" />
  </div>
</template>

<script>
import chatApp from './../cmps/space-details/chat-app.vue';
import orderForm from './../cmps/space-details/order-form.vue';
import reviewList from './../cmps/space-details/review-list.vue';
import spaceImgs from './../cmps/space-details/space-imgs.vue';
import googleMaps from './../cmps/google-maps.vue';
import showMore from './../cmps/show-more.vue';
import { spaceService } from '../services/space.service.js';
import spaceReserve from './../cmps/space-details/space-reserve.vue';
import msg from './../cmps/msg.vue';
import { socketService } from '../services/socket.service';
import DetailsImgPreview from '../cmps/space-details/details-img-preview.vue';
import spaceList from '../cmps/space-app/space-list.vue'

export default {
  name: 'space-details',
  async created() {
    try {
      socketService.on('updateViewerCount', this.updateViewerCount);
      socketService.emit('newViewer', this.$route.params.spaceId);
      this.$store.commit({ type: 'showViewers' });
      // if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
      //   alert('before unload');
      // }

      // this.ready = true
    } catch (err) {
      console.log('error in created in space-details', err);
      throw err;
    }
  },
  // beforeUnmount(){
  //   alert('before unload');
  // },

  data() {
    return {
      // viewerCount: 0,
      spaceId: this.$route.params.spaceId,
      // ready: false,
      msg: 'unset',
      space: {
        loc: {},
        reviews: [],
      },
      host: {},
      order: {
        hostId: '',
        createdAt: 0,
        buyer: {
          _id: '',
          fullname: '',
        },
        totalPrice: 0,

        startDate: '',
        endDate: '',
        guests: 0,
        //     "guests": {
        //       "adults":,
        //       "kids": 1
        //     },
        // dest: {
        //   country: "",
        //   countryCode: "",
        //   address: "",
        //   lat: null,
        //   lng: null,
        // },
        stay: {
          _id: '',
          name: '',
          price: 0,
        },
        status: 'pending',
      },
    };
  },

  computed: {
    showViewers() {
      console.log('viewers open', this.$store.getters.showViewers);
      return this.$store.getters.showViewers;
    },
    getMsg() {
      return this.msg;
    }, //TODO remove - this is for testing
    reviewsToShow() {
      const { reviews } = this.space;
      if (!reviews) return;

      return reviews.slice(0, 6);
    },
    totalRate() {
      const { reviews } = this.space;
      if (!reviews) return;

      const sums = reviews.map((r) => {
        const rateCategory = Object.values(r.rate);
        return rateCategory.reduce((acc, rc) => {
          return (acc += rc);
        }, 0);
      });
      const sum = sums.reduce((acc, ps) => {
        return (acc += ps);
      }, 0);
      return (sum / (reviews.length * 6)).toFixed(2);
    },
    numOfReviews() {
      if (!this.space.reviews) return;
      return this.space.reviews.length;
    },
    categoryRate() {
      const { reviews } = this.space;
      if (!reviews) return;
      const acc = {
        accuracy: 0,
        checkin: 0,
        cleanliness: 0,
        communication: 0,
        value: 0,
        location: 0,
      };
      const reviewsCatagoriesSum = reviews.reduce((acc, r) => {
        acc.accuracy += r.rate.accuracy;
        acc.checkin += r.rate.checkin;
        acc.communication += r.rate.communication;
        acc.cleanliness += r.rate.cleanliness;
        acc.value += r.rate.value;
        acc.location += r.rate.location;
        return acc;
      }, acc);

      for (const [key, value] of Object.entries(reviewsCatagoriesSum)) {
        reviewsCatagoriesSum[key] = +(value / reviews.length).toFixed(1);
      }
      return reviewsCatagoriesSum;
    },
  },

  methods: {
    updateViewerCount(count) {
      console.log('count in page****', count);
      this.msg = count;
    },
    icon(amenity) {
      return amenity.toLowerCase().replace(' ', '-');
    },
    async reserveToSave(reserve) {
      this.order.guests = reserve.guests;
      this.order.startDate = reserve.date.start;
      this.order.endDate = reserve.date.end;
      this.order.totalPrice = reserve.totalPrice;
      console.log(this.order);
      try {
        await this.$store.dispatch({ type: 'saveOrder', order: this.order });
      } catch (error) {
        console.log('cannot make order', error);
      }
      // tripToOrder
      // this.$store.dispatch({ type: 'tripToOrder' });
      // this.$store.commit('tripToOrder')
      // console.log(this.order);
    },
    showViewMsg(count) {
      console.log('viewing******!');
      this.msg = count;
      console.log(this.msg);
    },
    showBookedMsg() {
      console.log('booked!');
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

          this.order.hostId = space.host._id;
          this.order.createdAt = Date.now();
          this.order.buyer._id = this.$store.getters.loggedinUser._id;
          this.order.buyer.fullname = this.$store.getters.loggedinUser.fullname;
          this.order.buyer.imgUrl = this.$store.getters.loggedinUser.imgUrl;
          this.order.stay._id = space._id;
          this.order.stay.name = space.name;
          this.order.stay.price = space.price;

          // this.order.dest.country = this.space.loc.country;
          // this.order.dest.countryCode = this.space.loc.countryCode;
          // this.order.dest.address = this.space.loc.address;
          // this.order.dest.lat = this.space.loc.lat;
          // this.order.dest.lng = this.space.loc.lng;
        } catch (error) {
          console.log('cannot get space', error);
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
    showMore,
    spaceReserve,
    msg,
    DetailsImgPreview,
    spaceList
  },
  async beforeDestroy() {
    try {
      console.log(this.spaceId, '***************');
      await socketService.emit('removeViewer', this.spaceId);
      // socketService.terminate();
      console.log('about to leave page', this.getMsg);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
</script>

<template>
  <section class="space-reserve">
    <!-- <section class="space-reserve-box"> -->
    <div class="space-reserve-details">
      <p class="price">
        <span>{{ space.price }}</span> / night
      </p>

      <div class="rating">
        <p class="total-rate star">{{ rate }}</p>
        <span>•</span>
        <p class="number-reviews">({{ reviews }} reviews)</p>
      </div>
    </div>

    <form @submit.prevent="submit" value="value" class="space-reserve-form">
      <div class="options">
        <reserve-date @dateToReserve="dateToReserve2" />
        <!-- <reserve-guests @guestsToSave="guestsToSave2" /> -->
        <reserve-guests2 :limit="space.capacity" @guestsCnt="guestsToSave2" />
      </div>
      <!-- <button class="gradient-btn">Book</button> -->
      <gradient-btn :text="'Book'"></gradient-btn>
      <div v-if="total" class="total">
        <p class="title">Total</p>
        <p class="price">{{ total }}</p>
      </div>
    </form>
  </section>
  <!-- </section> -->
</template>

<script>
import reserveDate from './reserve-date.vue';
import reserveGuests from './reserve-guests.vue';
import reserveGuests2 from './reserve-guests2.vue';
import gradientBtn from '../gradient-btn.vue';
export default {
  // props: { space: Object, rate: Number, reviews: Number },
  props: ['space', 'rate', 'reviews'],
  data() {
    return {
      reserve: {
        date: {
          start: '',
          end: '',
        },
        guests: 1,
        // guests:{
        //     adults:null
        // }

        total: 0,
      },
    };
  },

  methods: {
    submit(value) {
      // console.log(value);
      this.$emit('reserve', this.reserve);
    },
    dateToReserve2(date) {
      this.reserve.date.start = date[0];
      this.reserve.date.end = date[1];
      // console.log('start',this.reserve.date.start,'end',this.reserve.date.end);
    },
    guestsToSave2(guests) {
      this.reserve.guests = guests;
    },
  },

  components: {
    reserveDate,
    reserveGuests,
    reserveGuests2,
    gradientBtn,
  },
};
</script>

<style scoped></style>

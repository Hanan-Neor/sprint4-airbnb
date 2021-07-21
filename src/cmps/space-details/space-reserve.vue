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
      <div v-if="totalPrice && reserve.date.start" class="total">
        <p class="title">Total:</p>
        <p class="price">{{ totalPrice }}</p>
      </div>
    </form>
  </section>
</template>

<script>
import reserveDate from './reserve-date.vue';
import reserveGuests from './reserve-guests.vue';
import reserveGuests2 from './reserve-guests2.vue';
import gradientBtn from '../gradient-btn.vue';

export default {
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
      days: 1,
    };
  },

  computed: {
    totalPrice() {
      return (
        this.space.price *
        this.days *
        this.reserve.guests
      ).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    },
  },

  methods: {
    async submit() {
      console.log(this.reserve);
      try {
        await this.$store.dispatch({ type: 'saveOrder', order: this.reserve });
        this.$router.push('/');
      } catch (err) {
        console.log('cannot submit order', err);
      }
    },

    dateToReserve2(date) {
      this.reserve.date.start = date[0];
      this.reserve.date.end = date[1];
      const start = new Date(this.reserve.date.start);
      const end = new Date(this.reserve.date.end);
      const diffInTime = end.getTime() - start.getTime();
      this.days = diffInTime / (1000 * 3600 * 24);
      this.reserve.total = this.space.price * this.days * this.reserve.guests;
    },

    guestsToSave2(guests) {
      this.reserve.guests = guests;
      this.reserve.total = this.space.price * this.days * this.reserve.guests;
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

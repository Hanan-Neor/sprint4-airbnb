<template>
  <section class="space-reserve">
    <!-- <section class="space-reserve-box"> -->
    <div class="space-reserve-details">
      <p class="price">
        <span>{{
          space.price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })
        }}</span>
        / night
      </p>

      <div class="rating-form">
        <p class="total-rate star">{{ rate }}</p>
        <span>•</span>
        <p class="number-reviews">({{ reviews }} reviews)</p>
      </div>
    </div>

    <form @submit.prevent="submit" value="value" class="space-reserve-form">
      <div class="options">
        <reserve-date @dateToReserve="dateToReserve2" />
        <reserve-guests2 :limit="space.capacity" @guestsCnt="guestsToSave2" />
      </div>
      <gradient-btn v-if="!booked" :text="'Book'"></gradient-btn>
      <div v-else class="booked">Booked!</div>
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
        totalPrice: 0,
      },
      days: 1,
      booked: false,
    };
  },

  computed: {
    totalPrice() {
      return (
        (this.space.price * this.days)
          //* this.reserve.guests
          .toLocaleString('en-US', { style: 'currency', currency: 'USD' })
      );
    },
  },

  methods: {
    submit() {
      if (!this.reserve.date.start) return;
      this.$emit('reserve', this.reserve);
      this.booked = true;
    },

    dateToReserve2(date) {
      const start = new Date(date[0]);
      const end = new Date(date[1]);
      const diffInTime = end.getTime() - start.getTime();
      this.days = diffInTime / (1000 * 3600 * 24);
      this.reserve.totalPrice =
        this.space.price * this.days * this.reserve.guests;
      this.reserve.date.start = start;
      this.reserve.date.end = end;
    },

    guestsToSave2(guests) {
      this.reserve.guests = guests;
      this.reserve.totalPrice =
        this.space.price * this.days * this.reserve.guests;
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

<style></style>

<template>
  <section class="space-reserve">
    {{ space.price }}
    <form @submit.prevent="submit" value="value">
      <reserve-date @dateToReserve="dateToReserve2" />
      <!-- <reserv-guests @guestsToSave="guestsToSave2" /> -->
      <reserv-guests2 :limit="space.capacity" @guestsCnt="guestsToSave2" />
      <br />
      <button>Submit</button>
    </form>
  </section>
</template>

<script>
import reserveDate from "./reserve-date.vue";
import reservGuests from "./reserve-guests.vue";
import reservGuests2 from "./reserve-guests2.vue";

export default {
  props: ["space"],
  data() {
    return {
      reserve:{
        date: {
          start: null,
          end: null,
        },
        guests:null
        // guests:{
        //     adults:null
        // }
        
      }
    };
  },

  methods: {
    submit(value) {
      // console.log(value);
      this.$emit('reserve', this.reserve)
    },
    dateToReserve2(date) {
      this.reserve.date.start = date[0];
      this.reserve.date.end = date[1];
      // console.log('start',this.reserve.date.start,'end',this.reserve.date.end);
    },
    guestsToSave2(guests){
      this.reserve.guests=guests
    }
  },

  components: {
    reserveDate,
    reservGuests,
    reservGuests2
  },
};
</script>

<style scoped>
.space-reserve {
  background-color: brown;
  text-align: center;
}
</style>


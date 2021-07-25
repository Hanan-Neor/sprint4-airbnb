<template>
  <section>
    <el-input-number
      class="num-guests"
      v-model="num"
      @change="handleChange"
      :min="1"
      :max="limit"
    ></el-input-number>
    <!-- <plus-minus-btn
      :minCapacity="1"
      :maxCapacity="limit"
      :typeOfGuests="'Adults'"
      v-model="guests.adults"
    ></plus-minus-btn> -->
    <!-- typeOfGuests: String,
    comment: String,
    minCapacity: Number,
    maxCapacity: Number, -->
  </section>
</template>
<script>
import plusMinusBtn from './plus-minus-btn.vue';
export default {
  props: ['limit'],
  data() {
    return {
      num: 1,
      // guests: {
      //   adults: 1,
      //   children: 0,
      //   infants: 0,
      // },
    };
  },
  methods: {
    handleChange(value) {
      this.$emit('guestsCnt', value);
    },

    updateNumOfGuests(type) {
      this.guests[type];
    },
  },

  components: {
    plusMinusBtn,
  },
};
</script>

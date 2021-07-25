<template>
  <div class="plus-minus-btn">
    <h3 class="type-of-guests">{{ typeOfGuests }}</h3>
    <h2 v-if="comment" class="comment">{{ comment }}</h2>
    <div class="btn">
      <button class="minus" @click="subtractGuest">-</button>
      <input
        type="text"
        :value="value"
        @input="updateValue($event.target.value)"
      />
      <button class="plus" @click="addGuest">+</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    typeOfGuests: String,
    comment: String,
    minCapacity: Number,
    maxCapacity: Number,
    value: Number,
  },

  data() {
    return {
      guests: 0,
    };
  },

  created() {
    this.guests = this.minCapacity;
  },

  methods: {
    subtractGuest() {
      console.log('hi');
      if (this.guests === this.minCapacity) return;
      this.guests--;
    },

    addGuest() {
      console.log('hi');

      if (this.guests === this.maxCapacity) return;
      this.guests++;
    },

    updateValue(value) {
      this.$emit('input', value);
    },
  },
};
</script>

<style></style>

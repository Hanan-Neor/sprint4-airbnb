<template>
  <form class="filter-form" action="">
    <div class="form-content">
      <div class="flex form-row">
        <label for="number">
          <p class="type">Adults</p>
          <p class="comment">Ages 13 or above</p>
        </label>
        <div class="count-picker">
          <button class="more" @click="editGuests(-1)">-</button>
          <input type="number" v-model="numGuests" id="number" />
          <button class="less" @click="editGuests(1)">+</button>
        </div>
      </div>

            <div class="flex form-row">
        <label for="number">
          <p class="type">Children</p>
          <p class="comment">Ages 2-12</p>
        </label>
        <div class="count-picker">
          <button class="more" @click="editGuests(-1)">-</button>
          <input type="number" v-model="numChildren" id="number" />
          <button class="less" @click="editGuests(1)">+</button>
        </div>
      </div>

            <div class="flex form-row">
        <label for="number">
          <p class="type">Infante</p>
          <p class="comment">Under 2</p>
        </label>
        <div class="count-picker">
          <button class="more" @click="editGuests(-1)">-</button>
          <input type="number" v-model="numGuests" id="number" />
          <button class="less" @click="editGuests(1)">+</button>
        </div>
      </div>

    </div>

    <div class="submit">
      <div class="flex">
        <button @click="clearInput" class="clear">Clear</button>

        <button class="btn-save" @click="setFilter">save</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      numAdults: 0,
      numChildren: 0,
      numInfants:0,
      numGuests: 0,
    };
  },
  methods: {
    editGuests(direction){
      if (this.numGuests === 0 && direction === -1) return;
      this.numGuests += direction
    },
    clearInput(){
      this.numGuests = 0;
    },
    setFilter() {
      console.log("setting the filter");
      this.$emit("set-filter", "numGuests", this.numGuests);
      this.$emit("close-form");
    },
  },
};
</script>

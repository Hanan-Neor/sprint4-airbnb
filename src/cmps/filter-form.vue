<template>
  <form class="filter-form" action="">
    <div class="form-content">
      <div class="flex form-row">
        <label for="adults">
          <p class="type">Adults</p>
          <p class="comment">Ages 13 or above</p>
        </label>
        <div class="count-picker">
          <button class="more" @click.stop="editGuests('adults', -1)">-</button>
          <input type="number" v-model="guests.adults" id="adults" />
          <button class="less" @click.stop="editGuests('adults',1)">+</button>
        </div>
      </div>

            <div class="flex form-row">
        <label for="children">
          <p class="type">Children</p>
          <p class="comment">Ages 2-12</p>
        </label>
        <div class="count-picker">
          <button class="more" @click.stop="editGuests('childen',-1)">-</button>
          <input type="number" v-model="guests.children" id="children" />
          <button class="less" @click.stop="editGuests('children',1)">+</button>
        </div>
      </div>

            <div class="flex form-row">
        <label for="infants">
          <p class="type">Infants</p>
          <p class="comment">Under 2</p>
        </label>
        <div class="count-picker">
          <button class="more" @click.stop="editGuests('infants',-1)">-</button>
          <input type="number" v-model="guests.infants" id="infants"/>
          <button class="less" @click.stop="editGuests('infants',1)">+</button>
        </div>
      </div>

    </div>

    <div class="submit">
      <div class="flex">
        <button @click.stop="clearInput" class="clear">Clear</button>

        <button class="btn-save" @click="setFilter">save</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      guests:{
        adults:0,
        children:0,
        infants:0
      }
    };
  },
  methods: {
    editGuests(type, direction){
        console.log('editing guests', type, direction);
      if (this.guests[type] === 0 && direction === -1) return;
      this.guests[type] += direction;
      this.$emit('guestsCnt',this.gusets)
    },
    clearInput(){
      this.guests = {
        adults:0,
        children:0,
        infants:0
      }
    },
    setFilter() {
      this.$emit("set-filter", 'numGuests', this.guests.adults + this.guests.children);
      this.$emit("close-form");
    },
  },
};
</script>

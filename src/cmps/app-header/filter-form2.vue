<template>
  <div class="filter-form" action="" style="top:110%">
    <div class="form-content">
      <div class="flex form-row">
        <label for="adults">
          <div class="type">Adults</div>
          <div class="comment">Ages 13 or above</div>
        </label>
        <div class="count-picker">
          <button class="more" :class="{zero : !guests.adults}" @click.stop="editGuests('adults', -1)">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 12px; width: 12px; stroke: currentcolor; stroke-width: 5.33333; overflow: visible;"><path d="m2 16h28"></path></svg>
            </button>
          <!-- <input type="number" v-model="guests.adults" id="adults" /> -->
          {{guests.adults}}
          <!-- {{guests2}} -->
          <button class="less" @click.stop="editGuests('adults',1)">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 12px; width: 12px; stroke: currentcolor; stroke-width: 5.33333; overflow: visible;"><path d="m2 16h28m-14-14v28"></path></svg>
          </button>
        </div>
      </div>

            <div class="flex form-row">
        <label for="children">
          <div class="type">Children</div>
          <div class="comment">Ages 2-12</div>
        </label>
        <div class="count-picker">
          <button class="more" :class="{zero : !guests.children}" @click.stop="editGuests('children',-1)">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 12px; width: 12px; stroke: currentcolor; stroke-width: 5.33333; overflow: visible;"><path d="m2 16h28"></path></svg>
            </button>
          <!-- <input type="number" v-model="guests.children" id="children" /> -->
          {{guests.children}}
          <!-- {{guests}} -->
          <button class="less" @click.stop="editGuests('children',1)">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 12px; width: 12px; stroke: currentcolor; stroke-width: 5.33333; overflow: visible;"><path d="m2 16h28m-14-14v28"></path></svg>
            </button>
        </div>
      </div>

            <div class="flex form-row">
        <label for="infants">
          <div class="type">Infants</div>
          <div class="comment">Under 2</div>
        </label>
        <div class="count-picker">
          <button class="more" :class="{zero : !guests.infants}" @click.stop="editGuests('infants',-1)">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 12px; width: 12px; stroke: currentcolor; stroke-width: 5.33333; overflow: visible;"><path d="m2 16h28"></path></svg>
            </button>
          <!-- <input type="number" v-model="guests.infants" id="infants"/> -->
          {{guests.infants}}
          <button class="less" @click.stop="editGuests('infants',1)">
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: none; height: 12px; width: 12px; stroke: currentcolor; stroke-width: 5.33333; overflow: visible;"><path d="m2 16h28m-14-14v28"></path></svg>
            </button>
        </div>
      </div>

    </div>

    <!-- <div class="submit">
      <div class="flex">
        <button @click="clearInput" class="clear">Clear</button>

        <button class="btn-save" @click="setFilter">save</button>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  // props:['guests'],
  props:['guests2'],

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

      this.$emit('guestsCnt', this.guests.adults + this.guests.children);
      // this.$emit("set-filter", 'numGuests', this.guests.adults + this.guests.children);

    },
    clearInput(){
      this.guests = {
        adults:0,
        children:0,
        infants:0
      }
    },
    setFilter() {
      console.log("setting the filter");
      this.$emit("set-filter", 'numGuests', this.guests.adults + this.guests.children);
      console.log("numGuests", this.guests.adults + this.guests.children);
      this.$emit("close-form");
    },
  },
};
</script>

<template>
  <section class="date-picker reserve-date-filter" >

    <!-- <el-date-picker
      @change="date"
      v-model="dates"
      type="daterange"
      range-separator=""
      start-placeholder="CHECK-IN"
      end-placeholder="CHECKOUT"
      style="background-color:inherit; border:0px; height=100% width:100%"
    >
    </el-date-picker> -->

    
    <!-- unlink-panels=true
    clear-icon
    clearable=false  -->
    <el-date-picker
    popper-class="date-picker-class"
    size="large"
    @input="date"
      @change="date"
      v-model="dates"
      type="daterange"
      style="background-color:inherit; border:0px; height=100%; width:100%; cursor:pointer"
      picker-options="pickerOptions"
    >
    </el-date-picker>

<!-- <input type="daterange">
            <div
          @click="toggleForm()"
          class="flex align-center filter-div-hover"
          style="border-radius: 3rem"
          :class="{ clicked: isGuestsClicked }"
        >
          <div class="guests-filter filter-div" @click="clicked('Guests')">
            <div>
              <label style="guestsStyle">Guests</label>
              <div class="bind-text" :class="{ clicked2: filterBy.numGuests }">
                {{ guestsText }}
              </div>
            </div>
          </div>
          <div class="filter-div-button">
            <button @click.stop="filterSpaces">search</button>
          </div>
        </div> -->


  </section>
</template>

<script>
export default {
  props:['dates'],
  data() {
    return {
      // dates: '',
      pickerOptions:{

          // onPick:

      }
    };
  },
//   computed:{
// getDates
//   },

  methods: {
    date() {
      this.dates = (this.dates)? this.dates : ''
      this.$emit('dateToReserve', this.dates);
    },
    x(){
      this.$emit('x');
    }
  },
};
</script>

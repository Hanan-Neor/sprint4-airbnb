<template>
  <div
    class="space-filter"
    style="background: white; border-radius: 32px; padding: 10px 30px" 
  >
    <form class="flex">
      <!-- <form @submit.prevent="filterSpaces" class="flex"> -->
      <!-- <input v-if="!showingFilters"
      class="start"
        @click="setShowFilters"
        type="text"
        placeholder="start your search"
      /> -->
      <div v-show="!showingFilters" class="start" @click="setShowFilters" style="width:300px">
        <!-- <div>start your search</div> -->
        <div>{{buttonText}}</div>
        <div class="search-icon-container">
          <svg
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            style="
              display: block;
              fill: none;
              height: 16px;
              width: 16px;
              stroke: white;
              stroke-width: 4;
              overflow: visible;
            "
          >
            <g fill="none">
              <path
                d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"
              ></path>
            </g>
          </svg>
        </div>
      </div>
      <template v-if="showingFilters" style="width:fit-content">
        <input
          @input="filterSpaces"
          type="text"
          placeholder="location"
          v-model="filterBy.location"
        />

        <input
          type="number"
          placeholder="Guests"
          v-model="filterBy.numGuests"
        />
        <input
          type="date"
          placeholder="checkin"
          v-model="filterBy.dates.startDate"
        />
        <input
          type="date"
          placeholder="checkout"
          v-model="filterBy.dates.endDate"
        />
        <button @click="filterSpaces">search</button>
      </template>
    </form>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.showingFilters);
  },
  data() {
    return {
      filterBy: {
        amenity: "all",
        amenities: [],
        type: "all",
        location: "",
        numGuests: 0,
        dates: { startDate: 0, endDate: 0 },
        count: 10, //take this value from parent
        currPage: 1,
      },
      showFilters: this.screenWidth > 720,
    };
  },
  methods: {
    async filterSpaces() {
      console.log('setting filter', this.filterBy.location);
      try {
        await this.$store.commit({
          type: "setFilter",
          filterBy: this.filterBy,
        });
        this.$store.dispatch({ type: "loadSpaces" });
      } catch (err) {
        console.log("error in space filter", "this.filterBy");
        throw err;
      }
    },
      close(e) {
    if (!this.$el.contains(e.target)) {
      //   this.state = false
      this.showFilters = false;
    }
  },

    setShowFilters() {
      this.showFilters = true;
    },
  },
   mounted() {
        document.addEventListener('click', this.close)
    },
    beforeDestroy() {
        document.removeEventListener('click', this.close)
    },
  computed: {
    buttonText(){
      return (this.filterBy.location)? this.filterBy.location : 'Start your search'
    },
    showingFilters() {
      return this.showFilters;
    },
  },
};
</script>



<template>
  <div class="space-filter" style="background: white; border-radius: 32px">
    <form class="flex">
      <!-- <form @submit.prevent="filterSpaces" class="flex"> -->
      <!-- <input v-if="!showingFilters"
      class="start"
        @click="setShowFilters"
        type="text"
        placeholder="start your search"
      /> -->
      <div
        v-show="!showingFilters"
        class="start"
        @click="setShowFilters"
        style="width: 300px"
      >
        <!-- <div>start your search</div> -->
        <div class="filter-div">{{ buttonText }}</div>
        <div class="filter-div-button">
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
      </div>
      <template v-if="showingFilters" style="width: fit-content">
        <div class="text-filter filter-div" :class="{ clicked: isTextClicked }">
          <!-- <div></div> -->
          <label for="text">Location</label>
          <input
            @focus="clicked('Text')"
            @blur="clicked('Text')"
            @input="filterSpaces"
            name="text"
            type="search"
            placeholder="Where are you going?"
            v-model="filterBy.location"
          />
        </div>

        <!-- <div class="filter-div">
        <input
          type="date"
          placeholder="checkin"
          v-model="filterBy.dates.startDate"
        />
        </div>
<div class="filter-div">

        <input
          type="date"
          placeholder="checkout"
          v-model="filterBy.dates.endDate"
        />
        </div> -->

        <div class="filter-div" :class="{ clicked: isDateClicked }">
          <reserve-date
            @dateToReserve="dateToReserve2"
            @focus="clicked('date')"
          />
        </div>

        <div
          @click="toggleForm()"
          class="flex align-center"
          style="border-radius: 3rem"
          :class="{ clicked: isGuestsClicked }"
        >
          <div class="guests-filter filter-div" @click="clicked('Guests')">
            <div>
              <label style="guestsStyle">Guests</label>
              <div class="bind-text" :class="{ clicked2: filterBy.numGuests }">
                <!-- <div class="bind-text" :class="{ clicked: guestsClicked }"> -->
                {{ guestsText }}
              </div>
            </div>
          </div>
          <div class="filter-div-button">
            <button @click.stop="filterSpaces">search</button>
          </div>
        </div>

        <filter-form
          v-if="isGuestsClicked"
          @guestsCnt="setGuestsCnt"
          @set-filter="updateFilter"
          @close-form="toggleForm"
        />
        <!-- <filter-form v-if="isFormOpen" @set-filter="updateFilter" @close-form="toggleForm" /> -->
      </template>
    </form>
  </div>
</template>

<script>
import filterForm from './filter-form.vue';
import reserveDate from './space-details/reserve-date.vue';
export default {
  created() {
    console.log(this.showingFilters);
  },
  data() {
    return {
      isDateClicked: false,
      guestsClicked: false,
      isTextClicked: false,
      isGuestsClicked: false,
      filterBy: {
        amenity: 'all',
        amenities: [],
        type: 'all',
        location: '',
        // numGuests: 0,
        numGuests: 0,
        dates: { startDate: 0, endDate: 0 },
        count: 10, //take this value from parent
        currPage: 1,
      },
      showFilters: this.screenWidth > 720,
      formOpen: false,
    };
  },
  methods: {
    setGuestsCnt(gusets) {
      this.filterBy.numGuests = gusets;
    },
    toggleForm() {
      this.formOpen = !this.formOpen;
    },
    async updateFilter(field, value) {
      this.filterBy.numGuests = value;
      console.log('setting filter...', this.filterBy);
      try {
        this.$store.commit({
          type: 'setFilterField',
          field: field,
          value: value,
        });
        await this.$store.dispatch({ type: 'loadSpaces' });
      } catch (err) {
        console.log('error in store moving to space-app from homepage', err);
        throw err;
      }
    },

    clicked(x) {
      switch (x) {
        case 'Guests':
          this.isGuestsClicked = !this.isGuestsClicked;
          break;
        case 'Text':
          this.isTextClicked = !this.isTextClicked;
          break;
        case 'date':
          this.isDateClicked = !this.isDateClicked;
          break;
      }
    },
    async filterSpaces() {
      console.log('setting filter', this.filterBy.location);
      try {
        await this.$store.commit({
          type: 'setFilter',
          filterBy: this.filterBy,
        });
        this.$store.dispatch({ type: 'loadSpaces' });
      } catch (err) {
        console.log('error in space filter', 'this.filterBy');
        throw err;
      }
    },
    close(e) {
      if (!this.$el.contains(e.target)) {
        //   this.state = false
        this.showFilters = false;
      }
      // if(!document.querySelector('.guests-filter').contains(e.target)){
      //   this.isGuestsClicked = false;
      // }
    },

    setShowFilters() {
      this.showFilters = true;
    },
  },
  mounted() {
    document.addEventListener('click', this.close);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.close);
  },
  computed: {
    isFormOpen() {
      return this.formOpen;
    },
    buttonText() {
      if (this.filterBy.location && !this.filterBy.numGuests)
        return `${this.filterBy.location} | Add guests`;
      if (!this.filterBy.location && this.filterBy.numGuests)
        return `Add location | ${this.filterBy.numGuests} Guests`;
      if (this.filterBy.location && this.filterBy.numGuests)
        return `${this.filterBy.location} | ${this.filterBy.numGuests} Guests`;
      return 'Start your search';

      // if (this.filterBy.location){
      //   if(this.filterBy.numGuests) return `${this.filterBy.location} | ${this.filterBy.numGuests} Guests`;
      //   else return this.filterBy.location
      //   }
      // else {
      //   return "Start your search";
      // }
    },
    guestsText() {
      return this.filterBy.numGuests ? this.filterBy.numGuests : 'Add guests';
    },
    showingFilters() {
      return this.showFilters;
    },
  },
  components: {
    filterForm,
    reserveDate,
  },
};
</script>

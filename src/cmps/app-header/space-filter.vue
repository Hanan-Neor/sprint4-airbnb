<template>
  <div class="space-filter full"  >
    <div class="form"  style="position:relative">
    <!-- <form class="flex" :class="{ filterOpenDown: showingFilters }"> -->

      <!-- <form @submit.prevent="filterSpaces" class="flex"> -->
      <!-- <input v-if="!showingFilters"
      class="start"
        @click="setShowFilters"
        type="text"
        placeholder="start your search"
      /> -->




      <!-- <div
        v-show="!showingFilters"
        class="start"
        @click="setShowFilters"
        style="width: fit-content;"
      >
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
      </div> -->


      <template style="width: fit-content">
        <div
          class="text-filter filter-div filter-div-hover"
          :class="{ clicked: isTextClicked }"
        >
          <!-- <div></div> -->
          <label for="text">Location</label>
          <input
            @focus="clicked('Text')"
            @blur="clicked('Text')"
            @change="filterSpaces"
            name="text"
            type="search"
            placeholder="Where are you going?"
            v-model="filterBy.location"
          />
        </div>

        <div class="flex date-responsive" style="position:relative;">
          <div
            class="filter-div date-filter1 filter-div-hover"
            :class="{ clicked: isDate1Clicked }"
            @click="clicked('date1')"
            style="flex-direction: column;"
          >
            <label style="">Check in</label>
            <div class="bind-text">
              <!-- <div class="bind-text" :class="{ clicked: guestsClicked }"> -->
              {{ date1ToShow }}
              <!-- {{filterBy.dates.startDate.toLocaleDateString()}} -->
            </div>
          </div>
          <div
            class="filter-div date-filter2 filter-div-hover"
            :class="{ clicked: isDate2Clicked }"
            @click="clicked('date2')"
            style="flex-direction: column; align-items: unset"
          >
            <label style="">Check out</label>
            <div class="bind-text">
              <!-- <div class="bind-text" :class="{ clicked: guestsClicked }"> -->
              {{ date2ToShow }}
              <!-- {{filterBy.dates.endDate.toLocaleDateString()}} -->
            </div>
          </div>
          <div @click="clicked('date1'),clicked('date2')"
          style="               
                opacity: 0.0;
                position: absolute;
                background-color: red;
                height:100%;
                width:100%;
                display:flex;
                align-items:center
              ">
            <reserve-date-filter
              class="fake-date-filter"
              style="background-color: blue;"
              
              @dateToReserve="dateToReserve"
              :dates="datesArray"
            />
          </div>
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

        <!-- <div
          class="filter-div date-filter filter-div-hover"
          :class="{ clicked: isDateClicked }"
          @click="clicked('date')"
          style="padding-top:0px;padding-bottom:0px;"
        >

          <reserve-date-filter @dateToReserve="dateToReserve" :dates="filterBy.dates" />
        </div> -->

        <div
          @click="toggleForm()"
          class="flex align-center filter-div-hover"
          style="border-radius: 3rem;position:relative"
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
          <!-- <div class="filter-div-button">
            <button @click.stop="filterSpaces">search</button>
          </div> -->
          <router-link to='/space'>
            <div class="search-icon-container" style="margin:9px" @click.stop="filterSpaces">
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
          </router-link>





        <filter-form2 
          v-if="isGuestsClicked"
          @guestsCnt="setGuestsCnt"
          @set-filter="updateFilter"
          @close-form="toggleForm"
          :guests="filterBy.numGuests"
        />
        </div>

        <!-- <filter-form v-if="isFormOpen" @set-filter="updateFilter" @close-form="toggleForm" /> -->
      </template>
    </div>
  </div>
</template>

<script>
import filterForm2 from "./filter-form2.vue";
import reserveDateFilter from "./reserve-date-filter.vue";
export default {
  created() {
    console.log(this.showingFilters);
    this.filterBy = this.$store.getters.filterBy
  },
  data() {
    return {
      isDate1Clicked: false,
      isDate2Clicked: false,
      guestsClicked: false,
      isTextClicked: false,
      isGuestsClicked: false,
      datesArray:[],
      filterBy: {
        amenity: "all",
        amenities: [],
        type: "all",
        location: "",
        numGuests: 0,
        // numGuests:{
        //   adults: 0,
        // },
        dates: { startDate: 0, endDate: 0 },
        count: 10, //take this value from parent
        currPage: 1,
      },
      showFilters: this.screenWidth > 720,
      formOpen: false,
    };
  },
  methods: {
    dateToReserve(date) {
      console.log(date);
      this.datesArray = date
      this.isDate1Clicked=false
      this.filterBy.dates.startDate = date[0];
      this.filterBy.dates.endDate = date[1];
      // console.log(this.filterBy.dates.startDate,this.filterBy.dates.endDate);
    },

    setGuestsCnt(gusets) {
      this.filterBy.numGuests = gusets;
    },
    toggleForm() {
      this.formOpen = !this.formOpen;
    },
    async updateFilter(field, value) {
      this.filterBy.numGuests = value;
      console.log("setting filter...", this.filterBy);
      try {
        this.$store.commit({
          type: "setFilterField",
          field: field,
          value: value,
        });
        await this.$store.dispatch({ type: "loadSpaces" });
      } catch (err) {
        console.log("error in store moving to space-app from homepage", err);
        throw err;
      }
    },

    clicked(x) {
      switch (x) {
        case "Guests":
          this.isGuestsClicked = !this.isGuestsClicked;
          break;
        case "Text":
          this.isTextClicked = !this.isTextClicked;
          break;
        case "date":
          this.isDateClicked = !this.isDateClicked;
          break;
        case "date1":
          // this.isDate1Clicked = !this.isDate1Clicked;
          this.isDate1Clicked = true;
          break;
        case "date2":
          this.isDate2Clicked = !this.isDate2Clicked;
          break;
      }
    },
    async filterSpaces() {
      console.log("setting filter", this.filterBy.location);
      // this.$router.go('/space')
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
    // hovering(e){
    //   console.log(e);
    //   // if (document.querySelector(".date-filter1").contains(e.target)) {
    //   if (document.querySelector(".date-filter1") === e.target) {
    //       document.querySelector(".date-filter1").classList.add("bla")
    //   }
    // },
    close(e) {
      // if(!document.querySelector(".filter-form"))return
      // if (document.querySelector(".filter-form").contains(e.target))return
      if (!this.$el.contains(e.target) && !document.querySelector(".open-filter-el").contains(e.target) )  {
        //   this.state = false
        // this.showFilters = false;
        this.$emit('toggleFilters')
      }
      if (document.querySelector(".guests-filter1")) {
        if (!document.querySelector(".guests-filter1").contains(e.target)) {
          this.isGuestsClicked = false;
        }
      }
      // if (document.querySelector(".date-filter")) {
      //   if (!document.querySelector(".date-filter").contains(e.target)) {
      //     this.isDateClicked = false;
      //   }
      // }
      if (document.querySelector(".date-filter1")) {
        // if (!document.querySelector(".date-filter1").contains(e.target)) {
        if (
          !document.querySelector(".date-filter1").contains(e.target) &&
          !document.querySelector(".fake-date-filter").contains(e.target)
        ) {
          this.isDate1Clicked = false;
        }
      }
      if (document.querySelector(".date-filter2")) {
        if (!document.querySelector(".date-filter2").contains(e.target)) {
          this.isDate2Clicked = false;
        }
      }
    },

    setShowFilters() {
      this.showFilters = true;
    },
  },
  mounted() {
    
    document.addEventListener("click", this.close);
    // document.addEventListener("mouseover", this.hovering);

    document.querySelector('.el-range-input').addEventListener('mouseover', function () {
        document.querySelector('.date-filter1').style.background = "rgb(230, 230, 230)";
        document.querySelector('.date-filter2').style.background = "rgb(230, 230, 230)";
    });
    document.querySelector('.el-range-input').addEventListener('mouseleave', function () {
        document.querySelector('.date-filter1').style.background = "inherit";
        document.querySelector('.date-filter2').style.background = "inherit";
    })
  },
  beforeDestroy() {
    document.removeEventListener("click", this.close);
  },
  computed: {
    // filterOpenDown(){
    //     return{
    //       position:(showingFilters) absolute
    //     }
    // },
    date1ToShow() {
      return this.filterBy.dates.startDate
        ? this.filterBy.dates.startDate.toLocaleDateString()
        : "Add dates";
    },
    date2ToShow() {
      return this.filterBy.dates.endDate
        ? this.filterBy.dates.endDate.toLocaleDateString()
        : "Add dates";
    },
    isFormOpen() {
      return this.formOpen;
    },
    guestsText() {
      return this.filterBy.numGuests ? this.filterBy.numGuests+' Guests' : "Add guests";
    },
    showingFilters() {
      return this.showFilters;
    },
  },
  components: {
    filterForm2,
    reserveDateFilter,
  },
};
</script>



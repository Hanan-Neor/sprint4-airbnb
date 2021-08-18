<template>
  <div class="space-filter full">
    <div class="form" style="position: relative">
      <template style="width: fit-content">
        <!-- ==================================================== Location ========================================================== -->
        <!-- <location :filterBy="filterBy"  @click="clicked('Text')"
          @mouseover="hovered('Text')"
          @mouseout="unhovered('Text')"></location> -->
        <div
          @click="clicked('Text')"
          @mouseover="hovered('Text')"
          @mouseout="unhovered('Text')"
          class="text-filter filter-div filter-div-hover"
          :class="{ clicked: isTextClicked }"
        >
          <div
            @click.stop="clearFilter('Text')"
            v-if="isTextClicked && filterBy.location"
            class="clear-button"
            style="width: 24px; height: 24px"
          >
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style="
                display: block;
                fill: none;
                height: 12px;
                width: 12px;
                stroke: currentcolor;
                stroke-width: 4;
                overflow: visible;
              "
            >
              <path d="m6 6 20 20"></path>
              <path d="m26 6-20 20"></path>
            </svg>
          </div>

          <label for="text">Location</label>
          <input
            @submit="filterSpaces"
            autocomplete="off"
            ref="location"
            name="text"
            type="text"
            placeholder="Where are you going?"
            v-model="filterBy.location"
          />
        </div>

        <!-- ============================================================================================================== -->

        <div
          class="tab-seperator"
          :class="{
            hidden:
              isTextHovered ||
              isTextClicked ||
              isDate1Hovered ||
              isDate1Clicked,
          }"
          style="
            width: 0px;
            height: 32px;
            align-self: center;
            border-right: 1px solid #dddddd;
          "
        ></div>

        <!-- ==================================================== Dates ========================================================== -->
        <!-- <div class="datepicker-trigger">
      <input
        type="text"
        id="datepicker-trigger"
        placeholder="Select dates"
        :value="formatDates(dateOne, dateTwo)"
      >

      <AirbnbStyleDatepicker
        :trigger-element-id="'datepicker-trigger'"
        :mode="'range'"
        :fullscreen-mobile="true"
        :date-one="dateOne"
        :date-two="dateTwo"
        @date-one-selected="val => { dateOne = val }"
        @date-two-selected="val => { dateTwo = val }"
      />
    </div> -->

        <div
          id="datepicker-trigger" 
          class="flex date-responsive datepicker-trigger"
          style="position: relative"
        >
          <AirbnbStyleDatepicker
            style="border-radius: 2rem; padding: 1rem 0; transition: 0s"
            :show-action-buttons="true"
            :offset-x="-180"
            :offset-y="10"
            :trigger-element-id="'datepicker-trigger'"
            :mode="'range'"
            :fullscreen-mobile="true"
            :date-one="dateOne"
            :date-two="dateTwo"
            @date-one-selected="
              (val) => {
                dateOne = val;
                
                updateDate1Filter();

               
              }
            "
            @date-two-selected="
              (val) => {
                dateTwo = val;
                updateDate2Filter();
              }
            "
            @closed="onClosedMethod"
          />

          <div
            id="datepicker-trigger"
            class="filter-div date-filter1 filter-div-hover"
            :class="{ clicked: isDate1Clicked }"
            @mouseover="hovered('date1')"
            @mouseout="unhovered('date1')"
            @click="clicked('date1')"
          >
            <div
              @click.stop="clearFilter('Date')"
              v-if="isDate1Clicked && filterBy.dates.startDate"
              class="clear-button"
              style="width: 24px; height: 24px"
            >
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style="
                  display: block;
                  fill: none;
                  height: 12px;
                  width: 12px;
                  stroke: currentcolor;
                  stroke-width: 4;
                  overflow: visible;
                "
              >
                <path d="m6 6 20 20"></path>
                <path d="m26 6-20 20"></path>
              </svg>
            </div>

            <label id="datepicker-trigger" style="">Check in</label>
            <div
              id="datepicker-trigger"
              class="bind-text"
              :class="{ clicked2: filterBy.dates.startDate}"
            >
            <!-- <div
              id="datepicker-trigger"
              class="bind-text"
              :class="{ clicked2: filterBy.dates.startDate && dateOne }"
            > -->
              {{ date1ToShow }}
              <!-- {{dateOne}} -->
            </div>
          </div>

          <div
            class="tab-seperator"
            :class="{
              hidden:
                isDate1Hovered ||
                isDate2Hovered ||
                isDate1Clicked ||
                isDate2Clicked,
            }"
            style="
              width: 0px;
              height: 32px;
              align-self: center;
              border-right: 1px solid #dddddd;
            "
          ></div>

          <div
            id="datepicker-trigger"
            class="filter-div date-filter2 filter-div-hover"
            :class="{ clicked: isDate2Clicked }"
            @mouseover="hovered('date2')"
            @mouseout="unhovered('date2')"
            @click="clicked('date2')"
          >
            <div
              @click.stop="clearFilter('Date')"
              v-if="isDate2Clicked && filterBy.dates.endDate"
              class="clear-button"
              style="width: 24px; height: 24px"
            >
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style="
                  display: block;
                  fill: none;
                  height: 12px;
                  width: 12px;
                  stroke: currentcolor;
                  stroke-width: 4;
                  overflow: visible;
                "
              >
                <path d="m6 6 20 20"></path>
                <path d="m26 6-20 20"></path>
              </svg>
            </div>

            <label id="datepicker-trigger" style="">Check out</label>
            <div
              id="datepicker-trigger"
              class="bind-text"
              :class="{ clicked2: filterBy.dates.endDate}"
            >
            <!-- <div
              id="datepicker-trigger"
              class="bind-text"
              :class="{ clicked2: filterBy.dates.endDate && dateTwo }"
            > -->
              <!-- <div class="bind-text" :class="{ clicked: guestsClicked }"> -->
              {{ date2ToShow }}
              <!-- {{dateTwo}} -->
              <!-- {{filterBy.dates.endDate.toLocaleDateString()}} -->
            </div>
          </div>
        </div>

        <!-- ============================================================================================================== -->

        <div
          class="tab-seperator"
          :class="{
            hidden:
              isDate2Hovered ||
              isDate2Clicked ||
              isGuestsHovered ||
              isGuestsClicked,
          }"
          style="
            width: 0px;
            height: 32px;
            align-self: center;
            border-right: 1px solid #dddddd;
          "
        ></div>

        <!-- ==================================================== Gusets ========================================================== -->

        <div
          @click="toggleForm()"
          class="flex align-center filter-div-hover"
          style="border-radius: 3rem; position: relative"
          :class="{ clicked: isGuestsClicked }"
        >
          <div
            class="guests-filter filter-div"
            @mouseover="hovered('Guests')"
            @mouseout="unhovered('Guests')"
            @click="clicked('Guests')"
          >
            <div
              @click.stop="clearFilter('Guests')"
              v-if="isGuestsClicked && filterBy.numGuests"
              class="clear-button"
              style="width: 24px; height: 24px; right: 0px"
            >
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style="
                  display: block;
                  fill: none;
                  height: 12px;
                  width: 12px;
                  stroke: currentcolor;
                  stroke-width: 4;
                  overflow: visible;
                "
              >
                <path d="m6 6 20 20"></path>
                <path d="m26 6-20 20"></path>
              </svg>
            </div>

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
          <router-link to="/space">
            <div
              class="search-icon-container"
              style="margin: 9px"
              @click.stop="filterSpaces"
            >
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
        </div>

        <filter-form2
          class="filter-form-to-close"
          v-show="formOpen"
          @guestsCnt="setGuestsCnt"
          @set-filter="updateFilter"
          @close-form="toggleForm"
          :guest2s="filterBy.numGuests"
        />

        <!-- <filter-form v-if="isFormOpen" @set-filter="updateFilter" @close-form="toggleForm" /> -->
      </template>
    </div>
  </div>
</template>

<script>
import location from "./space-filter-cmps/location.vue";

import { eventBusService } from "@/services/event-bus.service.js";

import filterForm2 from "./filter-form2.vue";
import reserveDateFilter from "./reserve-date-filter.vue";
export default {
  created() {
    console.log(this.showingFilters);
    this.filterBy = this.$store.getters.filterBy;
  },
  data() {
    return {
      dateFormat: "D MMM",
      dateOne: "",
      dateTwo: "",

      isTextHovered: false,
      isDate1Hovered: false,
      isDate2Hovered: false,
      isGuestsHovered: false,

      isDate1Clicked: false,
      isDate2Clicked: false,
      guestsClicked: false,
      isTextClicked: false,
      isGuestsClicked: false,
      datesArray: [],
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
  watch:{

  },
  methods: {
                
    updateDate1Filter(){
      if(this.dateOne){
        if(this.dateOne > this.dateTwo) {
            this.dateTwo='';
             this.filterBy.dates.endDate =0
        }
        this.isDate1Clicked = false;
                this.isDate2Clicked = true;
        this.filterBy.dates.startDate = new Date(
                   this.dateOne
                 ).toLocaleDateString();
      }else{
        this.filterBy.dates.startDate = 0
      }
    },
    updateDate2Filter(){
      if(this.dateTwo){
        // if(this.dateOne < this.dateTwo) {
        //     this.dateOne='';
        //      this.filterBy.dates.startDate =0
        // }
        this.filterBy.dates.endDate = new Date(
                   this.dateTwo
                 ).toLocaleDateString();
      }else{
        this.filterBy.dates.endtDate = 0
      }
    },
    onClosedMethod() {
      // console.log(new Date(this.dateOne));
      // if(this.dateOne){
      //   this.filterBy.dates.startDate = new Date(
      //     this.dateOne
      //   ).toLocaleDateString();
      // }
      // if(this.dateTwo){
      //   this.filterBy.dates.endDate = new Date(this.dateTwo).toLocaleDateString();
      // }
    },
    formatDates(dateOne, dateTwo) {
      let formattedDates = "";
      if (dateOne) {
        formattedDates = format(dateOne, this.dateFormat);
      }
      if (dateTwo) {
        formattedDates += " - " + format(dateTwo, this.dateFormat);
      }
      return formattedDates;
    },

    dateToReserve(date) {
      console.log(date);
      this.datesArray = date;
      this.isDate1Clicked = false;
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

    clearFilter(x) {
      switch (x) {
        case "Guests":
          this.filterBy.numGuests = 0;
          break;
        case "Text":
          this.filterBy.location = "";
          // this.$refs["location"].focus();
          break;
        case "Date":
          // console.log('before cleaning:','dateone'+ this.dateOne, 'datetwo' +this.dateTwo,'startdate'+this.filterBy.dates.startDate,'endedate'+this.filterBy.dates.endDate);
          this.dateOne = "";
          this.dateTwo = "";
          this.filterBy.dates.startDate = 0;
          this.filterBy.dates.endDate = 0;

          if(this.isDate2Clicked){
            this.isDate2Clicked = false;
                this.isDate1Clicked = true;
          }
          // console.log('after cleaning:', this.dateOne,this.dateTwo,this.filterBy.dates.startDate,this.filterBy.dates.endDate);
          break;
      }
    },
    clicked(x) {
      switch (x) {
        case "Guests":
          this.isGuestsClicked = !this.isGuestsClicked;
          break;
        case "Text":
          this.isTextClicked = true;
          this.$refs["location"].focus();
          break;
        case "Text-input":
          this.isTextClicked = !this.isTextClicked;
          break;
        case "date":
          this.isDateClicked = !this.isDateClicked;
          break;
        case "date1":
          if (this.isDate2Clicked) {
            document.querySelector(".date-filter1").click();
          this.isDate1Clicked = true;
          }else{
            this.isDate1Clicked = !this.isDate1Clicked;
          }
          // this.isDate1Clicked = !this.isDate1Clicked;
          // this.isDate1Clicked = !this.isDate1Clicked;
          this.isDate2Clicked = false;
          this.isTextClicked = false;
          this.isGuestsClicked = false;
          this.formOpen = false;

          break;
        case "date2":
          if (this.isDate1Clicked) {
            document.querySelector(".date-filter2").click();
          this.isDate2Clicked = true;
          }else{
            this.isDate2Clicked = !this.isDate2Clicked;
          }
          this.isDate1Clicked = false;
          this.isTextClicked = false;
          this.isGuestsClicked = false;
          this.formOpen = false;
          break;
      }
    },
    hovered(x) {
      switch (x) {
        case "Guests":
          this.isGuestsHovered = true;
          break;
        case "Text":
          this.isTextHovered = true;
          break;
        case "date":
          this.isDateClicked = !this.isDateClicked;
          break;
        case "date1":
          // this.isDate1Clicked = !this.isDate1Clicked;
          this.isDate1Hovered = true;
          break;
        case "date2":
          this.isDate2Hovered = true;
          break;
      }
    },
    unhovered(x) {
      switch (x) {
        case "Guests":
          this.isGuestsHovered = false;
          break;
        case "Text":
          this.isTextHovered = false;
          break;
        case "date":
          this.isDateClicked = !this.isDateClicked;
          break;
        case "date1":
          // this.isDate1Clicked = !this.isDate1Clicked;
          this.isDate1Hovered = false;
          break;
        case "date2":
          this.isDate2Hovered = false;
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

        this.$emit("toggleFilters");
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
      if (
        !this.$el.contains(e.target) &&
        !document
          .querySelector(".app-header .container .duplicate-for-observer")
          .contains(e.target)
      ) {
        this.$emit("toggleFilters");
      }
      if (document.querySelector(".text-filter")) {
        if (
          !document.querySelector(".text-filter").contains(e.target)
          // || this.isDate1Clicked
          // || document.querySelector(".datepicker-trigger").contains(e.target)
        ) {
          this.isTextClicked = false;
        }
      }
      if (document.querySelector(".guests-filter")) {
        if (
          !document.querySelector(".guests-filter").contains(e.target) &&
          !document.querySelector(".filter-form-to-close").contains(e.target)
        ) {
          this.isGuestsClicked = false;
        }
      }
      if (document.querySelector(".date-filter1")) {
        if (!document.querySelector(".date-filter1").contains(e.target)) {
          if (
            document.querySelector(
              ".asd__wrapper.asd__wrapper--datepicker-open"
            )
          ) {
            if (
              !document
                .querySelector(".asd__wrapper.asd__wrapper--datepicker-open")
                .contains(e.target)
            ) {
              this.isDate1Clicked = false;
            }
          } else {
            this.isDate1Clicked = false;
          }
        }
      }
      if (document.querySelector(".date-filter2")) {
        if (!document.querySelector(".date-filter2").contains(e.target)) {
          if (
            document.querySelector(
              ".asd__wrapper.asd__wrapper--datepicker-open"
            )
          ) {
            if (
              !document
                .querySelector(".asd__wrapper.asd__wrapper--datepicker-open")
                .contains(e.target)
            ) {
              this.isDate2Clicked = false;
            }
          } else {
            this.isDate2Clicked = false;
          }
        }
      }
      if (document.querySelector(".filter-form-to-close")) {
        if (
          !document.querySelector(".filter-form-to-close").contains(e.target) &&
          !document.querySelector(".guests-filter").contains(e.target)
        ) {
          this.formOpen = false;
        }
      }
    },

    setShowFilters() {
      this.showFilters = true;
    },
  },
  mounted() {
    document.addEventListener("click", this.close);
    eventBusService.$on("buttonClicked", (type) => {
      console.log(type);
      this.clicked(type);
    });
  },
  beforeDestroy() {
    document.removeEventListener("click", this.close);
  },
  computed: {
    isFilterOpen() {
      return this.$store.getters.isHeaderButtonStage;
    },
    // filterOpenDown(){
    //     return{
    //       position:(showingFilters) absolute
    //     }
    // },
    date1ToShow() {
      return (this.filterBy.dates.startDate)
      // return (this.filterBy.dates.startDate&&this.dateOne)
      // return (this.filterBy.dates.startDate && this.filterBy.dates.startDate!='Invalid Date')
        ? // ? this.filterBy.dates.startDate.toLocaleDateString()
          this.filterBy.dates.startDate
        : "Add dates";
    },
    date2ToShow() {
       return (this.filterBy.dates.endDate) 
      //  return (this.filterBy.dates.endDate&&this.dateTwo) 
     // return this.filterBy.dates.endDate
        ? // ? this.filterBy.dates.endDate.toLocaleDateString()
          this.filterBy.dates.endDate
        : "Add dates";
    },
    isFormOpen() {
      return this.formOpen;
    },
    guestsText() {
      return this.filterBy.numGuests
        ? this.filterBy.numGuests + " Guests"
        : "Add guests";
    },
    showingFilters() {
      return this.showFilters;
    },
  },
  components: {
    filterForm2,
    reserveDateFilter,
    location,
  },
};
</script>



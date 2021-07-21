<template>
  <div class="nav-filter full">
<div class="main-layout" style="width:100%">
  <div class="flex align-center" style="justify-content:space-between">
    <div class="space-types flex pointer">
      <span @click="updateFilter('type', 'all')">All</span>
      <span @click="updateFilter('type', 'Entire house')">House</span>
      <span @click="updateFilter('type', 'Entire villa')">Villas</span>
      <span @click="updateFilter('type', 'Treehouse')">Treehouse</span>
      <span @click="updateFilter('type', 'Entire chalet')">Chalet</span>
      <span @click="updateFilter('type', 'Entire cottage')">Cottage</span>
      <span @click="updateFilter('type', 'room')">Room</span>
      <span @click="updateFilter('type', 'Entire home')">Home</span>
      <span @click="updateFilter('type', 'Entire apartment')">Apartment</span>
      
    </div>
    <el-row v-if="isLargeScreen" class="buttons hover">
      <el-button @click="showFilterOptions()" round>Anytime</el-button>
      <el-button @click="toggleForm()" round>Guests</el-button>
      <el-button @click="showFilters()" round>Filters</el-button>
    </el-row>
    <filter-form v-if="isFormOpen" @set-filter="updateFilter" @close-form="toggleForm" />
    </div>
  </div>
  </div>
</template>

<script>
import filterForm from "./../filter-form.vue";
export default {
  name: "nav-filter",
  props: ["spaces"], //this is sent as a prop so the current display is filtered, not the entire database
  computed:{
    isFormOpen(){
      return this.formOpen
    },
    isLargeScreen(){ return this.$store.getters.isLargeScreen}
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
        count: 20, //change this to PAGE_SIZE when add pagination
        showFilterForm: false,
        currPage: 1,
      },
      formOpen: false,
    };
  },
  created() {
    this.filterBy = this.$store.getters.filterBy;
  },
  methods: {
    closeForm() {
      this.showFilterForm = false;
    },
    async updateFilter(field, value) {
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
    toggleForm(){
      this.formOpen = !this.formOpen
    },
    //TODO eventually combine the 3 functions below into  function
    showFilterOptions() {alert('filter options coming soon')},
    showGuestOptions() {},
    showFilters() {
      alert('filter form coming soon')
    },
  },
  components: {
    filterForm,
  },
};
</script>

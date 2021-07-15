<template>
  <div class="nav-filter">
    <div class="space-types flex pointer">
      <p @click="updateFilterType('home')">Homes</p> |
      <p @click="updateFilterType('villa')">Villas</p> |
      <p @click="updateFilterType('cabin')">Cabins </p> |

    </div>
    <el-row class="hover">
      <el-button @click="showFilterOptions()" round>Anytime</el-button>
      <el-button @click="showGuestForm()" round>Guests</el-button>
      <el-button @click="showFilters()" round>Filters</el-button>

    </el-row>
  </div>
</template>

<script>
export default {
  name: "nav-filter",
  props: ["spaces"], //this is sent as a prop so the current display is filtered, not the entire database
  data() {
    return {
      filterBy: {
        amenity: "all",
        amenities: [],
        type: "all",
        location: "",
        numGuests: 0,
        dates: { startDate: 0, endDate: 0 },
        count: Infinity, //change this to PAGE_SIZE when add pagination
      },
    };
  },
  created() {
    this.filterBy = this.$store.getters.filterBy;
  },
  methods: {
    filtered() {
      this.$emit("filtered", filterBy);
    },
    async updateFilterType(type) {
      this.filterBy.type = type;
      console.log("setting filter...", this.filterBy.location);
      try {
        await this.$store.commit({
          type: "setFilter",
          filterBy: this.filterBy,
        });
        this.$store.dispatch({ type: "loadSpaces" });
      } catch (err) {
        console.log("error in space filter", this.filterBy);
        throw err;
      }
    },
    //TODO eventually combine the 3 functions below into  function
    showFilterOptions(){

    },
    showGuestOptions(){

    },
    showFilters(){

    }
  },
};
</script>

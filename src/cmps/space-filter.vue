<template>

  <div class="space-filter">
<!-- <form @submit.prevent="setFilter" class="flex"> -->
    <input type="text" placeholder="start your search">
    <input @input="setFilter" type="text" placeholder="location" v-model="filterBy.location">
    <input type="number" placeholder="Guests" v-model="filterBy.numGuests">
    <input type="date" placeholder="checkin" v-model="filterBy.dates.startDate">
    <input type="date" placeholder="checkout" v-model="filterBy.dates.endDate">
    <button @click="setFilter">search</button>
<!-- </form> -->
  </div>

</template>

<script>
export default {
  data(){
    return {
      filterBy: {
        amenity: "all",
        amenities:[],
        type:"all",
        location: "",
        numGuests:0,
        dates: { startDate:0, endDate:0},
        count:Infinity //change this to PAGE_SIZE when add pagination
      }
    }
  },
  methods:{
    async setFilter(){
      console.log('setting filter...', this.filterBy.location);
      try{
        await this.$store.commit({type:'setFilter', filterBy:this.filterBy})
      } catch(err) {
        console.log('error in space filter', this.filterBy);
        throw err
      }
    }
  }

}
</script>


<style>

</style>
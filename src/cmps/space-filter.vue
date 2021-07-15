<template>
  <div class="space-filter">
    <input type="text" placeholder="start your search">

  </div>
</template>

<script>
export default {
  data(){
    return {
      filterBy: {
        amenity: "",
        amenities:[],
        location: "",
        numGuests:0,
        dates: { startDate:0, endDate:0},
        count:Infinity //change this to PAGE_SIZE when add pagination
      }
    }
  },
  actions:{
    
   
    
  }

}
</script>


<style>

</style>
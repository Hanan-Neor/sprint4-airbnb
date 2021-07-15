<template>
  <div class="nav-filter">
<div class="space-types">Treehouse Cabins Islands</div>
<!-- <div class="filter-buttons"> -->
    <el-row>
  <el-button round>Anytime</el-button>
  <el-button round>Guests</el-button>
  <el-button round>Filters</el-button>
  
</el-row>
<!-- </div> -->


  </div>



</template>

<script>
export default {
    name: 'nav-filter',
    props: ['spaces'],//this is sent as a prop so the current display is filtered, not the entire database
    methods: {
        filtered(){
            this.$emit('filtered', filterBy)
        }
    }

}
</script>

<style>

</style>
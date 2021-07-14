<template>
  <div class="nav-filter"></div>
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
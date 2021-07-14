<template>
  <div class="app-header">
      <router-link to="/">Home</router-link> |
      <router-link to="/space">Explore</router-link> |
      <router-link to="/space/host/edit">add space</router-link> |
  </div>
</template>

<script>
import spaceFilter from './space-filter.vue'

export default {
    components: {
        spaceFilter,
    }
}
</script>

<style>

</style>
<template>
  <div id="app" class="container">
    <app-header />
    <router-view />
    <app-footer />
    
  </div>
</template>

<script>
import appHeader from './../src/cmps/app-footer.vue'
import appFooter from './../src/cmps/app-footer.vue'

export default {
  data(){
    return {

    }
  },
  components: {
    appHeader,
    appFooter,
  }
}
</script>
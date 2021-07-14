<template>
  <div id="app" class="container">
    <p>this is the app</p>
    <app-header />
    <router-view />
    <app-footer />
    
  </div>
</template>

<script>
import appHeader from './cmps/app-header.vue'
import appFooter from './cmps/app-footer.vue'

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
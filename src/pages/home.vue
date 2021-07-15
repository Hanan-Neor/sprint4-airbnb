<template>
  <div class="home">
   <p>this is the home</p>
<!-- <img class="top-bg" src="https://a0.muscache.com/im/pictures/0c38042b-8685-4180-8d9b-12a6892ac6d8.jpg?im_q=highq&amp;im_w=720" alt=""> -->
  
  <space-list :spaces="spaces"/>
  
  </div>
</template>

<script>
import spaceList from './../cmps/space-app/space-list.vue'
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    spaceList,
},
created(){
  this.$store.dispatch({type: 'loadSpaces'})
  console.log('spaces in home', this.$store.getters.spaces);
},
computed: {
    spaces() {
      return this.$store.getters.spaces;
    },
  },
};
</script>

<style></style>

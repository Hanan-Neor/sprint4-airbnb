<template>
  <div class="home">
   <p>this is the home</p>
<img class="top-bg" src="https://a0.muscache.com/im/pictures/0c38042b-8685-4180-8d9b-12a6892ac6d8.jpg?im_q=highq&amp;im_w=720" alt="">
  <button @click="gotoSpaces({'count': Infinity})">I'm flexible</button>
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
  this.$store.commit({type: 'setFilterField', field:'count', value:4})
  this.$store.dispatch({type: 'loadSpaces'})
  console.log('spaces in home', this.$store.getters.spaces);
},
computed: {
    spaces() {

      return this.$store.getters.spaces;
    },
  },
  methods:{
    async gotoSpaces({field, value}){
      try {
        await this.$store.commit({type: 'setFilterField', field, value})
        this.$store.dispatch({type: 'loadSpaces'})//TODO this does not need to be here - they are also loaded in the app page, lets move all filtering to the load function
        console.log('filter before push:', this.$store.getters.filterBy );
        this.$router.push('/space');

      } catch(err) {
        console.log('error in store moving to space-app from homepage', err);
        throw err;
      }
    }
  }
};
</script>

<style></style>

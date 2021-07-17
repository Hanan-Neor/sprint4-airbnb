<template>
  <div class="home">
<img  class="top-bg" src="https://res.cloudinary.com/dymtestxz/image/upload/v1626437274/sprint4/homePage/57b9f708-bb12-498c-bc33-769f8fc43e63_gnsppx.webp" alt="">
  <button @click="gotoSpaces({field:'count',value: Infinity})">I'm flexible</button>
  <space-list :spaces="spaces"/>
  <div class="breaker-image">
    <!-- <img src="https://media.istockphoto.com/photos/abstract-art-of-pastel-watercolor-on-sketch-paper-texture-for-design-picture-id1050248898?k=6&m=1050248898&s=612x612&w=0&h=qsLmYVcPrQrgPvdZ4pCHQE2cdkoLkg8wn5WWnig7cns=" alt=""> -->
  	
    <img src="https://a0.muscache.com/im/pictures/f0343d6a-328c-4213-90a2-13ba3572a01f.jpg?im_w=320" alt="">
  </div>
  <explore-list :spaces="spaces"/>
  </div>
</template>

<script>
import spaceList from './../cmps/space-app/space-list.vue'
import exploreList from './../cmps/explore-list.vue'
import {eventBusService} from './../services/event-bus.service.js'
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    spaceList,
    exploreList,
},
created(){
  this.$store.commit({type: 'setFilterField', field:'count', value:4})
  this.$store.dispatch({type: 'loadSpaces'})
  console.log('spaces in home', this.$store.getters.spaces);
  eventBusService.$emit('headerFixed',true )
  // eventbus.$emit('headerFixed', true)


setTimeout(()=>{

  // const sectionOne = document.querySelector(".app-header")
  const sectionOne = document.querySelector(".top-bg")
const options={
  // root:null,
  // threshold:0,
  rootMargin : "1px"
}

const observer = new IntersectionObserver(function 
(entries, observer){
  entries.forEach(entry => {
    console.log(entry);
  });
}, options);

observer.observe(sectionOne);

},1000)



},
destroyed(){
  eventBusService.$emit('headerFixed' , false)
  // eventbus.$emit('headerFixed' , false)
  
        // eventBusService.$off('headerFixed');
    
},
computed: {
    spaces() {

      return this.$store.getters.spaces;
    },
  },
  methods:{
    async gotoSpaces({field, value}){
      try {
        this.$store.commit({type: 'setFilterField', field:field, value:value})
        await this.$store.dispatch({type: 'loadSpaces'})//TODO this does not need to be here - they are also loaded in the app page, lets move all filtering to the load function
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

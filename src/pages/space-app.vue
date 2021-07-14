<template>
  <div class="space-app">
      <nav-filter />
    <space-list @liked="liked(spaceId)" />

<!-- TODO add numbers for pagination here -->
    <p>Enter dates to see full pricing. Additional fees apply. Taxes may be added.</p>
  </div>
</template>

<script>
import spaceList from '../cmps/space-app/space-list.vue';
import navFilter from '../cmps/space-app/nav-filter.vue';

export default {
  components: { 
      spaceList,
      navFilter, 
    },
  name: 'home',
  data() {
    return {
      spaceToEdit: {
        txt: '',
        aboutUserId: null
      }
    }
  },
  computed: {
    spaces() {
      return this.$store.getters.spaces;
    },
  },
  created() {
    this.$store.dispatch({type: 'loadSpaces'})
  },
  methods: {
    liked(){
        //TODO send liked to space-store
    }
  }

  
}
</script>

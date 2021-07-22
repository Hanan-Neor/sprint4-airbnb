<template>
  <div class="space-app">
      <nav-filter />
    <space-list @liked="liked" :spaces="spaces" />

<!-- TODO add numbers for pagination here -->
    <pagination v-if="numSpaces" :pageSize="pageSize" :numSpaces="numSpaces" @setPage="setPage" />
    <p>Enter dates to see full pricing. Additional fees apply. Taxes may be added.</p>
  </div>
</template>

<script>
import spaceList from '../cmps/space-app/space-list.vue';
import navFilter from '../cmps/space-app/nav-filter.vue';
import pagination from '../cmps/space-app/pagination.vue';

export default {
  components: { 
      spaceList,
      navFilter, 
      pagination,
    },
  name: 'home',
  data() {
    return {
      spaceToEdit: {
        txt: '',
        aboutUserId: '',
      },
      pageSize: 10,
    }
  },
  computed: {
    spaces() {
      return this.$store.getters.spaces;
    },
    numSpaces(){ return this.$store.getters.totalSpacesAllPages } //num spaces after filter before pagination
  },
  async created() {
    console.log(this.$router.query);
   
    try {
      // await this.$store.commit({ type: "clearFilter" });
      await this.$store.commit({type: 'setFilterField', field:'count', value:this.pageSize})
      await this.$store.commit({type: 'setFilterField', field:'currPage', value:1})
      const spaces = await this.$store.dispatch({type: 'loadSpaces'})
      console.log(spaces);
      // const spacejson = JSON.stringify(spaces)
      // console.log(spacejson);

    } catch(err) {
      console.log('error creating spaces in store');
      throw err;
    }
  },
  async beforeDestroy(){
    try {
      // await this.$store.commit({ type: "clearFilter" });
    } catch(err) {
      console.log('error creating spaces in store');
      throw err;
    }
  },
  methods: {
    liked(spaceId){
       
      // alert('hi!')
        //TODO send liked to space-store
      console.log(spaceId);
      this.$store.dispatch({type: 'liked',spaceId})
    },
    setPage(currPage){
      console.log('setting page...');
      this.$store.commit({type: 'setFilterField', field:'currPage', value:currPage})
      this.$store.dispatch({type: 'loadSpaces'})

    }
  }

  
}
</script>

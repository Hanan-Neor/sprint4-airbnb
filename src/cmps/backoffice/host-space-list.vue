<template>
  <div class="host-space-list">
      <h2>space list </h2>
      <ul>
          <li v-for="space in spaces" :key="space._id">{{space.name}} </li>
      </ul>
  </div>
</template>

<script>


export default {
    props:['host'],
    data(){
        return{
            // spaces: {}
        }
    },
    async created(){
        try {
            const spaces = await this.getSpacesForHost() //loads spaces in the store
            console.log('spaces', spaces);
            // const host = await this.$store.state.loggedinUser;
            // console.log('host', host);
            //TODO clear space filters
        } catch(err){
            console.log('error getting host in dashboard');
            throw err
        }
    },
    computed:{
         spaces(){return this.$store.getters.spaces;}
    },
    methods:{
        //TODO move this function to a store
         async getSpacesForHost(){
            try{
                // 
                const hostId = this.host._id
                await this.$store.commit({ type: "clearFilter" });
                await this.$store.commit({type: 'setFilterField', field:'hostId', value:hostId})
                await this.$store.dispatch({type: 'loadSpaces'})
                return this.$store.getters.spaces
                // this.spaces = this.$store.getters.spaces;
                // console.log('spaces', this.spaces);

            } catch (err) {
                console.log('getSpacesForHost', err);
                throw err;
            }
        }
        
    }

}
</script>

<style>

</style>
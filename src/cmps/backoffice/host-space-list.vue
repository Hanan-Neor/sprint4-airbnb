<template>
  <div class="host-space-list">
      <order-chart v-if="spaceRatings && spaceRatings.length" :spaceNames="spaceNames" :spaceRatings="spaceRatings" />
      <h2>space list </h2>
      <ul>
          <li v-for="space in spaces" :key="space._id" class="flex">
              {{space.name}} by {{space.host.fullname}} 
              <!-- {{space._id}} -->
              <button @click="deleteSpace(space)">delete</button>
              <button @click="editSpace(space)">edit coming soon</button>
              </li>
         
      </ul>
  </div>
</template>

<script>
// import {filterService } from './../../services/filterFunctions.js'
import orderChart from './order-chart.vue'

export default {
    components:{
        orderChart
    },
    props:['host'],
    data(){
        return{
            // spaces: {}
        }
    },
    async created(){
        try {
            const spaces = await this.getSpacesForHost() //loads spaces in the store
            // console.log('spaceRatings', this.spaceRatings);
            // const host = await this.$store.state.loggedinUser;
            // console.log('host', host);
            //TODO clear space filters
        } catch(err){
            console.log('error getting host in dashboard');
            throw err
        }
    },
    computed:{
         spaces(){return this.$store.getters.spaces;},
         spaceRatings(){return this.$store.getters.spaceRatings;},
         spaceNames(){return this.$store.getters.spaceNames;},
    },
    methods:{
        //TODO move this function to a store
         async getSpacesForHost(){
            try{ 
                const hostId = this.host._id
                await this.$store.commit({ type: "clearFilter" });
                await this.$store.commit({type: 'setFilterField', field:'hostId', value:hostId})
                await this.$store.dispatch({type: 'loadSpaces'})
                return this.$store.getters.spaces
            } catch (err) {
                console.log('getSpacesForHost', err);
                throw err;
            }
        },
        async deleteSpace(space){
             try{ 
                await this.$store.dispatch({type: 'removeSpace', spaceId:space._id})
                await this.$store.dispatch({type: 'loadSpaces'})
            } catch (err) {
                console.log('getSpacesForHost', err);
                throw err;
            }
        },
        async editSpace(space){
            alert('edit this space', space.name)
             try{ 

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
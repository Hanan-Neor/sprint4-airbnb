<template>
  <div class="backoffice">
      <h1 v-if="host">Host dashboard: {{host.fullname}} </h1>
      <host-stats  />
      <order-chart />
      <review-chart />
      <host-space-list :host="host"/>
    <host-order-list :host="host" />

  </div>
</template>

<script>
import hostSpaceList from '../cmps/backoffice/host-space-list.vue'
import hostOrderList from '../cmps/backoffice/host-order-list.vue'
import hostStats from '../cmps/backoffice/host-stats.vue'
import orderChart from '../cmps/backoffice/order-chart.vue'
import reviewChart from '../cmps/backoffice/review-chart.vue'

export default {
    name: 'dashboard',
    components:{
        hostSpaceList,
        hostOrderList,
        hostStats,
        reviewChart,
        orderChart,
    },
    data(){
        return {
        }
    },
    computed:{
        host(){
            return this.$store.getters.loggedinUser
            },
       
    },
    async created(){
        try {
            const loggedinUser = await this.$store.dispatch({type:'loadLoggedInUser' })
            // const host = await this.$store.state.loggedinUser;
            // console.log('host', host);
            //TODO clear space filters
        } catch(err){
            console.log('error getting host in dashboard');
            throw err
        }
    },
    methods:{
       
    }
}
</script>

<style>

</style>
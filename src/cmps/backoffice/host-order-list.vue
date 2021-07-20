<template>
  <div class="host-order-list">
      <h2>order list </h2>
      <ul>
          <li v-for="order in orders" :key="order._id">{{order.name}} </li>
      </ul>
  </div>
</template>

<script>


export default {
    props:['host'],
    data(){
        return{
            // orders: {}
        }
    },
    async created(){
        try {
            const orders = await this.getOrdersForHost() //loads orders in the store
            console.log('orders', orders);
            // const host = await this.$store.state.loggedinUser;
            // console.log('host', host);
            //TODO clear order filters
        } catch(err){
            console.log('error getting host in dashboard');
            throw err
        }
    },
    computed:{
         orders(){return this.$store.getters.orders;}
    },
    methods:{
        //TODO move this function to a store
         async getOrdersForHost(){
            try{
                // 
                const hostId = this.host._id
                await this.$store.commit({ type: "clearFilter" });
                await this.$store.commit({type: 'setFilterField', field:'hostId', value:hostId})
                await this.$store.dispatch({type: 'loadOrders'})
                return this.$store.getters.orders
                // this.orders = this.$store.getters.orders;
                // console.log('orders', this.orders);

            } catch (err) {
                console.log('getOrdersForHost', err);
                throw err;
            }
        }
        
    }

}
</script>

<style>

</style>
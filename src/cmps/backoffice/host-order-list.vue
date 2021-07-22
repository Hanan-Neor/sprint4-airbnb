<template>
  <div class="host-order-list">
      <h2>order list </h2>
      <ul>
          <li v-for="order in orders" :key="order._id">
               {{order.stay.name}} {{order.guests}} 
                {{order.status}}
                <button @click="deleteOrder(order)">delete coming soon</button>
              <button @click="editOrder(order)">edit</button>
              <button v-if="order.status === 'pending'" @click="confirmOrder(order)"> confirm </button>
              <button v-if="order.status === 'pending'" @click="declineOrder(order)"> decline </button>
               </li>
      </ul>
  </div>
</template>

<script>


export default {
    props:['host'],
    data(){
        return{
        }
    },
    async created(){
        try {
            const orders = await this.getOrdersForHost() //loads orders in the store
            console.log('orders', orders);
        } catch(err){
            console.log('error getting host in dashboard');
            throw err
        }
    },
    computed:{
         orders(){return this.$store.getters.orders;},
    },
    methods:{
        //TODO move this function to a store
         async getOrdersForHost(){
            try{
                // 
                const hostId = this.host._id
                await this.$store.commit({ type: "clearFilter" });
                // await this.$store.commit({type: 'setFilterField', field:'hostId', value:hostId})
                await this.$store.dispatch({type: 'loadOrders'})
                return this.$store.getters.orders
            } catch (err) {
                console.log('getOrdersForHost', err);
                throw err;
            }
        },
          async deleteOrder(order){
               alert('delete this order', order.name)
             try{ 
                await this.$store.dispatch({type: 'removeOrder', orderId:order._id})
                await this.$store.dispatch({type: 'loadOrders'})
            } catch (err) {
                console.log('getOrdersForHost', err);
                throw err;
            }
        },
        async editOrder(order){
           const newName = prompt('enter new name')
            order.stay.name = newName
             try{ 
                 const savedOrder = await this.$store.dispatch({type:'saveOrder', order})
                    console.log('savedOrder', savedOrder);
            

            } catch (err) {
                console.log('getOrdersForHost', err);
                throw err;
            }
        },
        async confirmOrder(order){
            order.status = 'confirmed'
             try{ 
                 await this.$store.dispatch({type:'saveOrder', order})
            } catch (err) {
                console.log('getOrdersForHost', err);
                throw err;
            }
        },
        async declineOrder(order){
            order.status = 'declined'
             try{ 
                 await this.$store.dispatch({type:'saveOrder', order})
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
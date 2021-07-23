<template>
  <div class="host-order-list">
    <ul class="clear-list">
      <li v-for="order in orders" :key="order._id" class="host-order-item">
        <div class="profile-pic">
          <img v-if="order.buyer.imgUrl" :src="order.buyer.imgUrl" alt="" />
          <img v-else src="./../../assets/img/user.svg" alt="" />
        </div>
        <p class="user-name">{{ order.buyer.fullname }}</p>
        <div class="order-details">
          {{ order.guests }} guests • {{ order.startDate }} -
          {{ order.endDate }} • {{ order.stay.name }}
        </div>
        <div class="order-panel">
          <button
            class="confirm"
            v-if="order.status === 'pending'"
            @click="confirmOrder(order)"
          ></button>
          <button
            class="decline"
            v-if="order.status === 'pending'"
            @click="declineOrder(order)"
          ></button>
          <button class="edit" @click="editOrder(order)"></button>
        </div>
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
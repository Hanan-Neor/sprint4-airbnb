import { orderService } from '../../services/order.service.js';

export const orderStore = {
  state: {
    orders: [],
  },
  getters: {
    totalGuests(state) {
      const orders = Object.entries(state.orders);
      if (!orders.length) return;
      var totalGuests = 0;
      orders.forEach((order) => {
        totalGuests += order[1].guests.adults + order[1].guests.kids; //TODO why do I need [1] here???
      });
      return totalGuests;
    },
    orders(state) {
      return state.orders;
    },
  },
  mutations: {
    setOrders(state, { orders }) {
      state.orders = orders;
    },
    removeOrder(state, { orderId }) {
      const idx = state.orders.findIndex((t) => t._id === orderId);
      state.orders.splice(idx, 1);
    },
    updateOrder(state, { order }) {
      const idx = state.orders.findIndex((t) => t._id === order._id);
      state.orders.splice(idx, 1, order);
    },
    addOrder(state, { order }) {
      state.orders.push(order);
    },
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy;
    },
  },
  actions: {
    async loadOrders(context) {
      try {
        // const orders = await orderService.query(context.getters.filterBy);
        const orders = await orderService.query();
        context.commit({ type: 'setOrders', orders });
        return orders;
      } catch (err) {
        console.log('Cannot load orders', orders);
        throw err;
      }
    },
    async removeOrder({ commit }, payload) {
      try {
        await orderService.remove(payload.orderId);
        commit(payload);
      } catch (err) {
        console.log('Cannot remove', payload.orderId);
        throw err;
      }
    },
    async saveOrder({ commit }, { order }) {
      const type = order._id ? 'updateOrder' : 'addOrder';
      try {
        if (order._id) commit({ type:'updateOrder', order: order });
        else commit({ type:'addOrder', order: savedOrder })
        const savedOrder = await orderService.save(order);
        // debugger
        // return savedOrder;
      } catch (err) {
        console.log('Cannot save order', order._id);
        throw err;
      }
    },
  },
};

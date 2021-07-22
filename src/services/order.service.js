import { utilService } from './util.service.js';
import { storageService } from './async-storage.service.js';
import { httpService } from './http.service.js';

const ORDERS_KEY = 'orders';
// _createOrders();
window.orderService = orderService;

export const orderService = {
  query,
  remove,
  save,
  getEmptyOrder,
  getById,
};

async function query(filterBy) {
  try {
    //SERVER STORAGE
    let orders = await httpService.get(`order`, filterBy);
    return orders;
  } catch (err) {
    console.log('error getting orders in service', this.filterBy);
    throw err;
  }

  return storageService.query(ORDERS_KEY); //CLIENT STORGE
}

function remove(orderId) {
  return httpService.delete(`order/${orderId}`); //SERVER STORAGE
  return storageService.remove(ORDERS_KEY, orderId);
}

async function save(order) {
  console.log(order);
  try {
    if (order._id) {
      order = await httpService.put(`order/${order._id}`, order); //SERVER STORAGE
      return order; //SERVER STORAGE
    } else {
      console.log('hi');
      order = await httpService.post(`order/`, order); //SERVER STORAGE
      return order; //SERVER STORAGE
    }
  } catch (err) {
    console.log('error saving order in service', err);
    throw err;
  }
}

function getById(orderId) {
  return httpService.get(`order/${orderId}`); //SERVER STORAGE
  return storageService.get(ORDERS_KEY, orderId);
}

function getEmptyOrder() {
  return {
    _id: '',
    hostId: '',
    createdAt: Date.now(),
    buyer: {
      _id: '',
      fullname: '',
    },
    totalPrice: 0,
    startDate: '',
    endDate: '',
    guests: {
      adults: 0,
      kids: 0,
    },
    stay: {
      _id: '',
      name: '',
      price: 0,
    },
    status: '',
  };
}

async function _createOrders() {
  let orders = await storageService.query(ORDERS_KEY);
  if (!orders || !orders.length) {
    orders = [];
    orders.push({
      _id: 'o1225',
      hostId: '60f67ffe914fd26c90b86843', //TODO can change this back to the original id
      createdAt: 9898989,
      buyer: {
        _id: 'u101',
        fullname: 'User 1',
      },
      totalPrice: 160,
      startDate: '2025/10/15',
      endDate: '2025/10/17',
      guests: {
        adults: 2,
        kids: 1,
      },
      stay: {
        _id: 'h102',
        name: 'House Of Uncle My',
        price: 80.0,
      },
      status: 'pending',
    });
    storageService.postMany(ORDERS_KEY, orders);
  }
  return orders;
}

// function _createOrder(vendor, maxSpeed = 250) {
//   const order = {
//     id: utilService.makeId(),
//     vendor,
//     maxSpeed,
//   };
//   return order;
// }

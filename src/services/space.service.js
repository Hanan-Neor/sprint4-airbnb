import { httpService } from './http.service.js';
import { storageService } from './async-storage.service.js';
import { utilService } from './util.service.js';
import { filterService } from './filterFunctions.js';
const SPACE_KEY = 'space';

export const spaceService = {
  query,
  remove,
  save,
  getEmptySpace,
  getById,
};

window.spaceService = spaceService;
// _createSpaces();

async function query(filterBy) {
  console.log('filter in service', filterBy);
  try {
    let spaces = await httpService.get(`space`, filterBy); //SERVER STORAGE
    // let spaces = await storageService.query(SPACE_KEY); //CLIENT STORAGE
    // const spacesForDisplay = await filterService.getSpacesForDisplay(
    //   spaces,
    //   filterBy
    // );
    return spaces;
  } catch (err) {
    console.log('error getting spaces in service', this.filterBy);
    throw err;
  }

  // return spaces;
}

function remove(spaceId) {
  return httpService.delete(`space/${spaceId}`); //SERVER STORAGE
  // return storageService.remove(SPACE_KEY, spaceId); //CLIENT STORAGE
}

async function save(space) {
  if (space._id) {
    space = await httpService.put(`space/${space._id}`, space); //SERVER STORAGE
    return space; //SERVER STORAGE
    // return storageService.put(SPACE_KEY, space); //CLIENT STORAGE
  } else {
    space = await httpService.post(`space`, space); //SERVER STORAGE
    return space; //SERVER STORAGE
    // return storageService.post(SPACE_KEY, space); //CLIENT STORAGE
  }
}

async function getById(spaceId) {
  return httpService.get(`space/${spaceId}`); //SERVER STORAGE
  // const space = await storageService.get(SPACE_KEY, spaceId); //CLIENT STORAGE
  // return space; //CLIENT STORAGE
}

function getEmptySpace() {
  return {
    // _id: 's' + utilService.makeId(), //CLIENT STORAGE
    name: '',
    imgUrls: [
      //TODO change this when we start using cloudinary
      'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80',
    ],
    price: 0,
    description: '',
    capacity: 1,
    amenities: [],
    type: 'home',
    host: {
      _id: '',
      fullname: '',
      imgUrl: '',
    },
    loc: {
      country: '',
      countryCode: '',
      address: '',
      lat: 0,
      lng: 0,
    },
    reviews: [
      //removed content because a new space has no reviews
      // {
      //   _id: '',
      //   txt: '',
      //   rate:{
      //     "cleanliness":2,
      //     "checkin":3,
      //     "communication":3,
      //     "accuracy":1,
      //     "value":5,
      //     "location":3
      //   },
      //   by: {
      //     _id: '',
      //     fullname: '',
      //     imgUrl: '',
      //   },
      // },
    ],
    likedByUserIds: [],
  };
}

async function _createSpaces() {
  console.log('creating spaces');
  // if (spaces && spaces.length) return spaces; //CLIENT STORAGE
  // let spaces = await storageService.query(SPACE_KEY); //CLIENT STORAGE
  let spaces = utilService.loadFromStorage(SPACE_KEY); //SERVER STORAGE

  if (!spaces || !spaces.length) {
    spaces = [];

    // storageService.postMany(SPACE_KEY, spaces); //CLIENT STORAGE
    utilService.saveToStorage(SPACE_KEY, spaces); //SERVER STORAGE
  }
  return spaces;
}

// import { httpService } from './http.service.js';
import { storageService } from './async-storage.service.js';
import { utilService } from './util.service.js';
const SPACE_KEY = 'space';

export const spaceService = {
  query,
  remove,
  save,
  getEmptySpace,
  getById,
};

_createSpaces();

function query() {
  return storageService.query(SPACE_KEY);
}

function remove(spaceId) {
  return storageService.remove(SPACE_KEY, spaceId);
}

function save(space) {
  if (space._id) {
    return storageService.put(SPACE_KEY, space);
  } else {
    return storageService.post(SPACE_KEY, space);
  }
}

async function getById(spaceId) {
  const space = await storageService.get(SPACE_KEY, spaceId);
  return space;
}

function getEmptySpace() {
  return {
    _id: 's' + utilService.makeId(),
    name: '',
    imgUrls: [],
    price: 0,
    description: '',
    capacity: 0,
    amenities: [],
    type: '',
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
      {
        _id: '',
        txt: '',
        rate: 0,
        by: {
          _id: '',
          fullname: '',
          imgUrl: '',
        },
      },
    ],
    likedByUserIds: [],
  };
}

async function _createSpaces() {
  console.log('test');
  // function createSpaces() {
  let spaces = await storageService.query(SPACE_KEY);
  if (!spaces || !spaces.length) {
    console.log(
      '🚀 ~ file: space.service.js ~ line 78 ~ createSpaces ~ spaces.length',
      spaces.length
    );
    console.log(
      '🚀 ~ file: space.service.js ~ line 78 ~ createSpaces ~ spaces',
      spaces
    );
    spaces = [];
    spaces.push({
      _id: 's' + utilService.makeId(),
      name: 'jkn kjlklm',
      imgUrls: [
        'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80',
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80',
      ],
      price: 100,
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
      capacity: 5,
      amenities: [
        'TV',
        'wifi',
        'bath',
        'kitchen',
        'free parking',
        'washing machine',
        'smoke alarm',
        'lockbox',
        'air conditioning',
        'security cameras',
      ],
      type: 'villa',
      host: {
        _id: 'u101',
        fullname: 'lkm; oorom',
        imgUrl:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
      },
      loc: {
        country: 'Israel',
        countryCode: 'IL',
        address: 'Tel Aviv, Israel',
        lat: 0,
        lng: 0,
      },
      reviews: [
        {
          _id: 'r102',
          txt: 'sdvmlvs adklmalkm wfbhlwekjfn aejfnhkjs.',
          rate: 4,
          by: {
            _id: 'u894',
            fullname: 'kslmv sojks',
            imgUrl:
              'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
          },
        },
      ],
      likedByUserIds: ['u101', 'u102', 'u103'],
    });
    storageService.postMany(SPACE_KEY, spaces);
  }
  return spaces;
}

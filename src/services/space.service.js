// import { httpService } from './http.service.js';
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

_createSpaces();

async function query(filterBy) {
  // return storageService.query(SPACE_KEY);
  console.log('filter in service', filterBy);
  try {
    let spaces = await storageService.query(SPACE_KEY);
    const spacesForDisplay = await filterService.getSpacesForDisplay(spaces, filterBy);
    return spacesForDisplay
  } catch(err) {
    console.log('error getting spaces in service', this.filterBy);
    throw err
  }

  return spaces;

}

function remove(spaceId) {
  return storageService.remove(SPACE_KEY, spaceId);
}

function save(space) {
  if (space._id) {
    console.log('savingn space', space);
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
    // _id: 's' + utilService.makeId(),
    name: '',
    imgUrls: [ //TODO change this when we start using cloudinary
      'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80',
    ],
    price: 0,
    description: '',
    capacity: 6,
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
    reviews: [ //removed content because a new space has no reviews
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
      type: 'home',
      name: 'OAKTREEHOUSE - SLEEP IN THE TREEHOUSE',
      imgUrls: [
        'https://a0.muscache.com/im/pictures/412e2eca-eddf-40fb-81b3-883335a894e0.jpg?im_w=720',
        'https://a0.muscache.com/im/pictures/b17c9174-3c3d-4e6e-8929-b5158b30c9c6.jpg?im_w=720',
        'https://a0.muscache.com/im/pictures/eba6db58-fb72-4791-a86a-e646f3dae6bc.jpg?im_w=720',
        'https://a0.muscache.com/im/pictures/a0f5c7cc-4d95-4843-889b-1f8ef5b2c873.jpg?im_w=720',
        'https://a0.muscache.com/im/pictures/88473896-9f70-4c04-9f9b-68950f833c2b.jpg?im_w=720',
      ],
      price: 135,
      description:
        `TREEHOUSE is installed on four adult oaks. A wooden bridge leads directly to the terrace with a view of the surrounding trees. The house is connected to the electricity grid. Water is supplied in containers and is used for hand washing and basic hygiene. Inside our treehouse there is a chair and a sofa bed, basic kitchen equipment, electric kettle for water, plates etc. Dry toilet is located 15m from the treehouse. Attic is reserved for sleeping (2 people). Sofa bed is downstairs.
        The space
        Our tree house is designed for everyone who likes nature, would like to try, how it is to spend time during the day eg. sitting on the terrace or at night sleeping near trees at an altitude of almost 6 meters. We invite you to rest and “recharge the battery” in the unique atmosphere of the Little Carpathians. Youth, the elderly, families with children or couples – everyone is welcome. During your stay in our treehouse, your neighbors become squirrels, forest birds: titmouse, woodpeckers, cuckoos and other, stag beetle, salamanders, grass snakes, hedgehogs and seasonally skylights
        Other things to note
        We can rent two mountain bikes
        Garden shower`,
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
      host: {
        _id: 'u101',
        fullname: 'Ania & Peter',
        imgUrl:
          'https://a0.muscache.com/im/pictures/user/169c278f-2716-4789-a7b3-44d4fccb5035.jpg?aki_policy=profile_large',
      },
      loc: {
        country: 'Slovakia',
        countryCode: 'IL',
        address: 'Modra, Slovakia',
        lat: 48.334632,
        lng: 17.307569,
      },
      reviews: [
        {
          _id: 'r102',
          txt: 'sdvmlvs adklmalkm wfbhlwekjfn aejfnhkjs.',
          rate:{
            "cleanliness":2,
            "checkin":3,
            "communication":3,
            "accuracy":1,
            "value":5,
            "location":3
          },
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
    spaces.push({
      _id: 's' + utilService.makeId(),
      name: 'Givat Shmuel',
      type:'home',
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
          rate:{
            "cleanliness":2,
            "checkin":3,
            "communication":3,
            "accuracy":1,
            "value":5,
            "location":3
          },
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
    spaces.push({
      _id: 's' + utilService.makeId(),
      name: 'Still Life St Paul\'s Executive',
      type: 'home',
      imgUrls: [
        'https://a0.muscache.com/im/pictures/miso/Hosting-17823159/original/0a6eeebb-4c3e-4e6c-9bff-414012c215f4.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/miso/Hosting-17823159/original/46ef9170-4b3d-42d4-b4e0-d7e7087c445e.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/2e707f27-6214-4c56-b9de-751a25c2cfa8.jpg?im_w=720',
        'https://a0.muscache.com/im/pictures/miso/Hosting-17823159/original/91a8e796-2828-4412-847d-38ea1cdc2890.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/miso/Hosting-17823159/original/7a7142c4-1e7c-4146-8d72-1efd04d872a9.jpeg?im_w=720',
      ],
      price: 118,
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
      capacity: 4,
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
      host: {
        _id: 'u101',
        fullname: 'Mar',
        imgUrl:
          'https://a0.muscache.com/im/pictures/user/e456810a-e172-4a26-997a-53dfbbb08951.jpg?aki_policy=profile_large',
      },
      loc: {
        country: 'United Kingdom',
        countryCode: 'GB',
        address: 'London, England',
        lat: 51.5033331,
        lng: -0.0793664,
      },
      reviews: [
        {
          _id: 'r102',
          txt: 'sdvmlvs adklmalkm wfbhlwekjfn aejfnhkjs.',
          rate:{
            "cleanliness":2,
            "checkin":3,
            "communication":3,
            "accuracy":1,
            "value":5,
            "location":3
          },
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
    spaces.push({
      _id: 's' + utilService.makeId(),
      name: 'Jerusalem',
      type: 'home',
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
          rate:{
            "cleanliness":2,
            "checkin":3,
            "communication":3,
            "accuracy":1,
            "value":5,
            "location":3
          },
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
    spaces.push({
      _id: 's' + utilService.makeId(),
      name: 'Jerusalem',
      type: 'home',
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
          rate:{
            "cleanliness":2,
            "checkin":3,
            "communication":3,
            "accuracy":1,
            "value":5,
            "location":3
          },
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
    spaces.push({
      _id: 's' + utilService.makeId(),
      name: 'Jerusalem',
      type:'villa',

      imgUrls: [
        'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80',
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80',
      ],
      price: 100,
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
      capacity: 3,
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
          rate:{
            "cleanliness":2,
            "checkin":3,
            "communication":3,
            "accuracy":1,
            "value":5,
            "location":3
          },
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
    spaces.push({
      _id: 's' + utilService.makeId(),
      name: 'Jerusalem',
      type: 'cabin',
      imgUrls: [
        'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80',
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80',
      ],
      price: 100,
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
      capacity: 2,
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
          rate:{
            "cleanliness":2,
            "checkin":3,
            "communication":3,
            "accuracy":1,
            "value":5,
            "location":3
          },
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
    spaces.push({
      _id: 's' + utilService.makeId(),
      name: 'Jerusalem',
      type: 'cabin',
      imgUrls: [
        'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80',
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=753&q=80',
      ],
      price: 100,
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
      capacity: 1,
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
          rate:{
            "cleanliness":2,
            "checkin":3,
            "communication":3,
            "accuracy":1,
            "value":5,
            "location":3
          },
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

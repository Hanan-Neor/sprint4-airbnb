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
    const spacesForDisplay = await filterService.getSpacesForDisplay(
      spaces,
      filterBy
    );
    return spacesForDisplay;
  } catch (err) {
    console.log('error getting spaces in service', this.filterBy);
    throw err;
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



    // ==========================================================================
    // 1 ===========================================================================



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
      description: `TREEHOUSE is installed on four adult oaks. A wooden bridge leads directly to the terrace with a view of the surrounding trees. The house is connected to the electricity grid. Water is supplied in containers and is used for hand washing and basic hygiene. Inside our treehouse there is a chair and a sofa bed, basic kitchen equipment, electric kettle for water, plates etc. Dry toilet is located 15m from the treehouse. Attic is reserved for sleeping (2 people). Sofa bed is downstairs.
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
          _id: 'r101',
          txt:
            'Perfection to a very tiny detail, one of a kind experience! We really enjoyed the stay and especially the great sleep in the middle of forrest :) Would definitely love to come back.',
          rate: 4,

          by: {
            _id: 'u894',
            fullname: 'Zuzana',
            imgUrl:
              'https://a0.muscache.com/im/pictures/user/38be01af-b895-4932-b301-0deefa2786f0.jpg?aki_policy=profile_large',
          },
        },
        {
          _id: 'r102',
          txt: `Ania and Peter are sympathetic couple with inspirational life style what changed our staying to the more amazing experience. Thanks for nature which gave us beautiful sounds and my opinion is that we were at the right time in the right place. In May, nature wakes up, so it is even more of an experience to sleep in the treehouse. You must see! We liked it everything and the most outside shower with refreshing water. We are giving them 10 from 10.
          If you are nature lovers go and experience staying in OAKTREEHOUSE by your self. You can ask Ania and Peter what to do around, they will recommend it you hiking, biking, wine testing etc.`,
          rate: 4,
          by: {
            _id: 'u895',
            fullname: 'Anita',
            imgUrl:
              'https://a0.muscache.com/im/pictures/user/86e81cda-2769-43cf-b76f-8b3901e36f3b.jpg?aki_policy=profile_large',
          },
        },
        {
          _id: 'r103',
          txt: `A extraordinary experience! In my opinion A BIT PRICY! Probably better in summertime... It was my first stay in a house built on trees. My small daughter and I choose it to celebrate our personal father/daughter’s day. She loved it! The house is very well built, nice and clean. It is equipped with a sink, separated with a small door (not sure why!) but for the toilet you have to walk outside in a separate shack with compost type of “collection”! Not the most convenient in cold weather conditions or if you need to go in the night especially when you try in the dark to go down the ladder form the sleeping mezzanine... :/
          Peter was very helpful selecting the most dry wood from his stack which became humid with the rain and that helped a lot to start the fire for a nice evening barbecue. There’s not much to see or do in the area, but the house doesn’t really make you wanna go anywhere else. 1 night was ok... not sure October weather can allow more with an open air shower! All in all it was a memorable experience, but, as I said already, a bit pricy considering the services.`,
          rate: 4,
          by: {
            _id: 'u896',
            fullname: 'Onofrio',
            imgUrl:
              'https://a0.muscache.com/im/pictures/user/2e56e461-97d5-46b8-b594-7a380e8da459.jpg?aki_policy=profile_large',
          },
        },
        {
          _id: 'r104',
          txt: `Great location, nice people, good communication - definitly to recommend! We booked as a birthday surprise for friends and they have been super happy!`,
          rate: 4,
          by: {
            _id: 'u897',
            fullname: 'Florian',
            imgUrl:
              'https://a0.muscache.com/im/pictures/user/2e7a5f78-744b-464d-9a49-3869bcc7600e.jpg?aki_policy=profile_large',
          },
        },
        {
          _id: 'r105',
          txt: 'sdvmlvs adklmalkm wfbhlwekjfn aejfnhkjs.',
          rate: {
            cleanliness: 2,
            checkin: 3,
            communication: 3,
            accuracy: 1,
            value: 5,
            location: 3,
          },
          by: {
            _id: 'u898',
            fullname: 'kslmv sojks',
            imgUrl:
              'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
          },
        },
        {
          _id: 'r106',
          txt: `Cosy place in the trees - very unique experience. Fire place to have a BBQ - cold shower outside, birds singing in the morning... Definitely recommended if you are up to experience something and don't want to have it "normal". Looking forward to coming back.
          Lubos`,
          rate: 4,
          by: {
            _id: 'u899',
            fullname: 'Lars',
            imgUrl:
              'https://a0.muscache.com/im/pictures/user/abe04ca8-1483-4a60-9e0c-dd38dd6268f9.jpg?aki_policy=profile_large',
          },
        },
      ],
      likedByUserIds: ['u101', 'u102', 'u103'],
    });

    // ==========================================================================
    // 2 ===========================================================================


    spaces.push({
      _id: 's' + utilService.makeId(),
      name: 'Chalet Eigernordwand',
      imgUrls: [
        'https://a0.muscache.com/im/pictures/b5a5444a-91ab-43cf-abf1-79832793a56d.jpg?im_w=720',
        'https://a0.muscache.com/im/pictures/miso/Hosting-18153460/original/7e7fca56-6af0-491a-95ba-fa92e96a9a0c.jpeg?im_w=720',
        'https://a0.muscache.com/im/pictures/a91d2c6f-e5b2-4e96-90f2-e0579d69038a.jpg?im_w=720',
        'https://a0.muscache.com/im/pictures/7f273de4-b8eb-4242-8df4-3355c6df7223.jpg?im_w=720',
        'https://a0.muscache.com/im/pictures/77cdae47-7827-4fa6-9b8d-5b9dfcbe15ef.jpg?im_w=720',
      ],
      price: 153,
      description: `3.5-room apartment in a beautiful, quiet location in Grindelwald with 2 double bedrooms and spacious bathroom with bath and shower. The heart of the apartment is the open kitchen as well as the cozy, bright living and dining area. The kitchen is fully equipped with a kettle, coffee maker, toaster, microwave and dishwasher. There is a hairdryer in the bathroom. Balcony with a beautiful view of the Eiger north wall.

        Guest access
        Parking and ski storage are available.`,
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
        fullname: 'Hermann',
        imgUrl:
          'https://a0.muscache.com/im/pictures/user/235e5738-74a3-4390-a564-72d5a9417a92.jpg?aki_policy=profile_large',
      },
      loc: {
        country: 'Switzerland',
        countryCode: 'IL',
        address: 'Grindelwald, Bern',
        lat: 46.62433,
        lng: 8.03403,
      },
      reviews: [
        {
          _id: 'r101',
          txt: 'Brilliant place. Modern, new, easy to park, 5 minute drive to center, fully equipped.',
          rate: {
            cleanliness: 2,
            checkin: 3,
            communication: 3,
            accuracy: 1,
            value: 5,
            location: 3,
          },
          by: {
            _id: 'u891',
            fullname: 'Lior',
            imgUrl:
              'https://a0.muscache.com/im/pictures/user/79217452-8f8a-4786-8dfb-290eb2578bde.jpg?aki_policy=profile_large',
          },
        },
        {
          _id: 'r102',
          txt: `Matches the name perfectly - located right in front of the Eiger-Nordwand, the apartment offers an astonishing view of the mountains. While Grindelwald center is just a short walk away, the location is perfect for hiking in the region. The interior is extremely comfy and provides everything one would need during a weeks worth of vacation. All-in-all a really pleasant experience, a huge thanks for that!`,
          rate: 4,
          by: {
            _id: 'u892',
            fullname: 'Fabio',
            imgUrl:
              'https://a0.muscache.com/im/pictures/user/f3d5d005-6a58-4cd8-9321-0bcdac9c8d18.jpg?aki_policy=profile_large',
          },
        },
        {
          _id: 'r103',
          txt: `Great location with the Eiger mountain as your backyard view and front view of Grindelwald. Easy walk to Männlichenbahn. Place was clean, modern, and plenty of space for our two young kids. Hermann was generous to provide an adapter after I found out I brought the wrong one.`,
          rate: 4,
          by: {
            _id: 'u893',
            fullname: 'Dennis',
            imgUrl:
              'https://a0.muscache.com/im/pictures/user/8fc8cbeb-e888-4d19-9825-3fab7d72cac3.jpg?aki_policy=profile_large',
          },
        },
        {
          _id: 'r104',
          txt: `This was a terrific stay. It's a lovely place with beautiful views. It's also well located, outside of the village but walking distance. I started many hikes during my stay right from the chalet. When I arrived I walked with my luggage from the Terminal train station though it is an uphill climb. I mostly walked into the village and to the grocery store as the bus only comes once an hour and, well, the walk is simply stunning even in the rain. Bring your own umbrella if you feel you need one as there isn't one at the chalet. The place is well equipped otherwise. Hermann was also very responsive to messages I sent him through the website.`,
          rate: 4,
          by: {
            _id: 'u894',
            fullname: 'Sandeep',
            imgUrl:
              'https://a0.muscache.com/im/pictures/user/50b4247d-f7b3-4b66-aed7-095a082ce1fd.jpg?aki_policy=profile_large',
          },
        },
        {
          _id: 'r105',
          txt: `Amazing views, ultra comfortable chalet and sparkling clean! Will stay again. Great spot to access all of Grindelwald.`,
          rate: 4,
          by: {
            _id: 'u895',
            fullname: 'Christina And Tim',
            imgUrl:
              'https://a0.muscache.com/im/pictures/user/2062bf92-cd9a-46de-a851-8fb36ebf0273.jpg?aki_policy=profile_large',
          },
        },
        {
          _id: 'r106',
          txt: `Hermann’s place was better than what we expected. He provided us with everything we needed, including a high chair and a baby bed for our daughter. He was very helpful and super responsive during our stay. The view from the chalet is stunning, on both sides. We came by car but there was a bus stop just next to the chalet, so it’s easy accessible for people coming by train/bus.
          Thanks again Hermann, we’ll be back!`,
          rate: 4,
          by: {
            _id: 'u896',
            fullname: 'Julian',
            imgUrl:
              'https://a0.muscache.com/im/users/4417841/profile_pic/1355853603/original.jpg?aki_policy=profile_large',
          },
        },
        {
          _id: 'r107',
          txt: `The vast space and the cleanliness of this home are second to none. The views were splendid. We appreciate the modern amenities. Indeed it is easier if you have a car as it is located about 10 mins or so from the centre however bus no. 123 runs hourly. Easy self check in & out, keep in view if you have many luggages, staircases on the side. Its winter, the large suitcases we had gave us quite a workout! Our experience: so much better than staying in a hotel!
          `,
          rate: 4,
          by: {
            _id: 'u897',
            fullname: 'Angelina',
            imgUrl:
              'https://a0.muscache.com/im/pictures/user/d9f57e5b-e392-4c8a-aa17-2d200a3526f1.jpg?aki_policy=profile_large',
          },
        },
        {
          _id: 'r108',
          txt: `We had a wonderful stay in Hermann’s place. It is very modern and new. The living area is very spacious and open with Eiger views. The 2 bedrooms and bathrooms are very comfortable and nice windows looking out. Hiking trails start right from your door and the views are incredible!!`,
          rate: 4,
          by: {
            _id: 'u898',
            fullname: 'Emma',
            imgUrl:
              'https://a0.muscache.com/im/pictures/user/9f75bd0c-d7f9-42a8-ba13-5c6201bd0b5c.jpg?aki_policy=profile_large',
          },
        },
      ],
      likedByUserIds: ['u101', 'u102', 'u103'],



      // ==========================================================================
      // 3 ===========================================================================




    });
    spaces.push({
      _id: 's' + utilService.makeId(),
      name: "Still Life St Paul's Executive",
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
          rate: {
            cleanliness: 2,
            checkin: 3,
            communication: 3,
            accuracy: 1,
            value: 5,
            location: 3,
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


    // ==========================================================================
    // 4 ===========================================================================




    spaces.push({
      _id: 's' + utilService.makeId(),
      name: 'Superbe chalet Hautes Vosges en pleine nature',
      imgUrls: [
        'https://a0.muscache.com/im/pictures/3a8f8bf5-a0c4-4b9d-bb27-fff31d00e9b4.jpg?im_w=1200',
        'https://a0.muscache.com/im/pictures/45b9ddd1-b259-40b9-a81d-dfef8258f9b9.jpg?im_w=720',
        'https://a0.muscache.com/im/pictures/23464bb6-5525-4a91-901f-a50b758bd6c2.jpg?im_w=720',
        'https://a0.muscache.com/im/pictures/fb848313-297b-4b64-8685-0bcd11e3e5ab.jpg?im_w=720',
        'https://a0.muscache.com/im/pictures/b1b9395b-d418-407a-bf24-541fd2e4af77.jpg?im_w=720',
      ],
      price: 65,
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
        fullname: 'Philippe',
        imgUrl:
          'https://a0.muscache.com/im/pictures/user/2062bf2d-8710-4204-9cc8-7ac24242a14c.jpg?aki_policy=profile_large',
      },
      loc: {
        country: 'France',
        countryCode: 'IL',
        address: 'Fresse sur Moselle, Grand Est',
        lat: 47.87556,
        lng: 6.78865,
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




    // ==========================================================================
    // 5 ===========================================================================




    spaces.push({
      _id: 's' + utilService.makeId(),
      name: 'Jerusalem',
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


    // ==========================================================================
    // 6  ===========================================================================



    spaces.push({
      _id: 's' + utilService.makeId(),
      name: 'Jerusalem',
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


    // ==========================================================================
    // 7  ===========================================================================



    spaces.push({
      _id: 's' + utilService.makeId(),
      name: 'Jerusalem',
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


    // ==========================================================================
    // 8 ===========================================================================



    spaces.push({
      _id: 's' + utilService.makeId(),
      name: 'Jerusalem',
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


    // ==========================================================================
    // 9 ===========================================================================



    spaces.push({
      _id: 's' + utilService.makeId(),
      name: 'Jerusalem',
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

    // ==========================================================================
    // 10 ===========================================================================



    spaces.push({
      _id: 's' + utilService.makeId(),
      name: 'Jerusalem',
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

    // ==========================================================================
    // 11 ===========================================================================



    spaces.push({
      _id: 's' + utilService.makeId(),
      name: 'Jerusalem',
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



    // ==========================================================================
    // 12 ===========================================================================



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
          rate: {
            cleanliness: 2,
            checkin: 3,
            communication: 3,
            accuracy: 1,
            value: 5,
            location: 3,
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


    // ==========================================================================
    // 13 ===========================================================================



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
          rate: {
            cleanliness: 2,
            checkin: 3,
            communication: 3,
            accuracy: 1,
            value: 5,
            location: 3,
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


    // ==========================================================================
    // 14 ===========================================================================



    spaces.push({
      _id: 's' + utilService.makeId(),
      name: 'Jerusalem',
      type: 'villa',

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
          rate: {
            cleanliness: 2,
            checkin: 3,
            communication: 3,
            accuracy: 1,
            value: 5,
            location: 3,
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



    // ==========================================================================
    // 15 ===========================================================================



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
          rate: {
            cleanliness: 2,
            checkin: 3,
            communication: 3,
            accuracy: 1,
            value: 5,
            location: 3,
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


    // ==========================================================================
    // 16 ===========================================================================



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
          rate: {
            cleanliness: 2,
            checkin: 3,
            communication: 3,
            accuracy: 1,
            value: 5,
            location: 3,
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



    // ==========================================================================
    // ===========================================================================


    storageService.postMany(SPACE_KEY, spaces);
  }
  return spaces;
}

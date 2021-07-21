import { spaceService } from '../../services/space.service.js';
import { filterService } from '../../services/filterFunctions';

export const spaceStore = {
  state: {
    spaces: [],
    filterBy: {
      amenity: 'all',
      amenities: [],
      type: 'all',
      location: '',
      country: '', //for explore list
      numGuests: 0,
      dates: { startDate: 0, endDate: 0 },
      count: 20, //change this to PAGE_SIZE when add pagination
      currPage: 1,
      hostId: '',
    },
    appPageSize: 10//TODO take out of cmps and pages and use only here - or use only in page w props //QUQU which is better
  },
  getters: {
    spaceRatings(state){
      if (!state.spaces || !state.spaces.length) return 
      return state.spaces.map(space => {
          return filterService.getAverageReview(space)
      })
    },
    spaceNames(state){
      if (!state.spaces || !state.spaces.length) return 
      return state.spaces.map(space => {
          return space.name
      })
    },
    totalLikes(state){
      if (!state.spaces || !state.spaces.length) return 
      return state.spaces.reduce((total, space) => {
        return total + space.likedByUserIds.length
      }, 0)
    },
    totalSpaceCapacity(state){
      if (!state.spaces || !state.spaces.length) return 
      return state.spaces.reduce((total, space) => {
        return total + space.capacity
      }, 0)
    },
    getAverageRating(state){
      if (!state.spaces.length) return
      var totalRates = 0
      state.spaces.forEach(space => {
        const rate = filterService.getAverageReview(space)
          totalRates += rate
      });
      return totalRates / state.spaces.length
  },
    totalSpacesAllPages(state) {
      return state.spaces.length;
    },
    spaces(state) {
      //this is the spaces after filter and after pagination
      const filterBy = state.filterBy;
      //pagination here below
      if (filterBy.count !== Infinity) {
        console.log('count of pages', filterBy.count);
        const firstSpace = filterBy.count * (filterBy.currPage - 1);
        const lastSpace = firstSpace + filterBy.count;
        console.log('first', firstSpace, ': last', lastSpace);
        return state.spaces.slice(firstSpace, lastSpace);
      }
      //if no max-page-size
      return state.spaces;
    },
    filterBy(state) {
      return state.filterBy;
    },
  },
  mutations: {
    setSpaces(state, { spaces }) {
      state.spaces = spaces;
    },
    removeSpace(state, { spaceId }) {
      const idx = state.spaces.findIndex((t) => t._id === spaceId);
      state.spaces.splice(idx, 1);
    },
    updateSpace(state, { space }) {
      const idx = state.spaces.findIndex((t) => t._id === space._id);
      state.spaces.splice(idx, 1, space);
    },
    addSpace(state, { space }) {
      state.spaces.push(space);
    },
    setFilter(state, { filterBy }) {
      debugger
      state.filterBy = filterBy;
    },
    setFilterField(state, { field, value }) {
      state.filterBy[field] = value;
    },
    clearFilter(state) {
      state.filterBy = {
        amenity: 'all',
        amenities: [],
        type: 'all',
        location: '',
        country: '', //for explore list
        numGuests: 0,
        dates: { startDate: 0, endDate: 0 },
        count: Infinity, //change this to PAGE_SIZE when add pagination
        currPage: 1,
        hostId: '',
      };console.log('filter clear');
    },
    // addReview(state, { space }) {
    //   const idx = state.spaces.findIndex((t) => t._id === space._id);
    //   state.spaces.splice(idx, 1, space);
    // },
  },
  actions: {
    
    // async liked(context,payload){
    //     console.log(payload.spaceId);
    // },
    async loadSpaces(context) {
      try {
        const spaces = await spaceService.query(context.getters.filterBy);
        context.commit({ type: 'setSpaces', spaces });
          return spaces;
      } catch (err) {
        console.log('Cannot load spaces in store');
        throw err;
      }
    },
    async removeSpace({ commit }, payload) {
      try {
        await spaceService.remove(payload.spaceId);
        commit(payload);
      } catch (err) {
        console.log('Cannot remove', spaceId);
        throw err;
      }
    },
    async saveSpace({ commit }, payload) {
      const type = payload.space._id ? 'updateSpace' : 'addSpace';
      try {
        const savedSpace = await spaceService.save(payload.space);
        commit({ type, space: savedSpace });
        return savedSpace;
      } catch (err) {
        console.log('Cannot save space', review, spaceId);
        throw err;
      }
    },
  },
};

//TODO add orders:[{startDate, endDate}] to the spaces collection

export const filterService = {
  getSpacesForDisplay,
  getAverageReview

}

var filterBy = {
  amenity: "",
  amenities: [],
  type:'all',
  location: "",
  country: '',//for explore list
  numGuests: 0,
  dates: { startDate: 0, endDate: 0 },
  count: 20, //change this to PAGE_SIZE when add pagination
  currPage: 1,
  getAverageReview,
};



function _isAvailable(space, dates) {
  let orders = orderService.query()
  return orders.every(order => {
    return order.space._id !== space._id ||
      dates.startDate >= order.startDate && dates.endDate <= order.endDate
  })
}

function getAverageReview(space) {
  if (!space.reviews || !space.reviews.length) return 0
  const reviewSum = space.reviews.reduce((sum, review) => {
    return sum + _getReviewRate(review)
  },0)
  return reviewSum / space.reviews.length
  
}

function _getReviewRate(review) {
  if (!Object.keys(review.rate) || !Object.keys(review.rate).length) return 0
  const rates = review.rate;
  const totalRates = Object.values(rates).reduce((sum, rate) => sum + rate)
  return totalRates / Object.values(rates).length // or '/ 6'
}

function getSpacesForDisplay(spaces, filterBy) {
  
  //filter space
  spaces = spaces.filter(space => {
    // return (filterBy.amenity === 'all' || space.amenities.includes(filterBy.amenity))
      // && filterBy.amenities.foreach(amenity => space.amenities.includes(amenity))
      // && _isAvailable(space, filterBy.dates)

      //TODO try using google api to search by location
      return (filterBy.type === 'all' || space.type === filterBy.type)
      && ((space.loc.address.toLowerCase().includes(filterBy.location.toLowerCase()) || space.loc.countryCode.toLowerCase().includes(filterBy.location.toLowerCase()) || space.loc.country.toLowerCase().includes(filterBy.location.toLowerCase())) 
      && space.capacity >= Number(filterBy.numGuests))
      && space.loc.country.toLowerCase().includes(filterBy.country.toLowerCase())
    })
    //sort by reviews
    // spaces = spaces.sort((space1, space2) => {
    // debugger;
    // return getAverageReview(space1) - getAverageReview(space2)
  // })

  //slice out the amount you want for this page
  // if (filterBy.count !== Infinity) {
  //   const firstSpace = filterBy.count * (filterBy.currPage - 1);
  //   const lastSpace = firstSpace + filterBy.count; 
  //   console.log('first', firstSpace, ": last", lastSpace );
  //   spaces = spaces.slice(firstSpace, lastSpace)
  // }

    return spaces
  const spacesForDisplay = spaces
  return spacesForDisplay;
}

var rate = {
  "cleanliness": 2,
  "checkin": 3,
  "communication": 3,
  "accuracy": 1,
  "value": 5,
  "location": 3
}



//TODO add orders:[{startDate, endDate}] to the spaces collection


var filterBy = {
    amenity: "",
    amenities:[],
    location: "",
    numGuests:0,
    dates: { startDate:0, endDate:0},
    count:Infinity //change this to PAGE_SIZE when add pagination
  };

function isAvailable(space, date, orders){
    return orders.every(order => {
      return order.space._id !== space._id ||
        space.dates.startDate >= order.startDate && space.dates.endDate <= order.endDate
    })
  }

function  getSpacesForDisplay(spaces, filterBy){
    if (filterBy.location.length) {}

    //filter space
    spaces = spaces.filter(space => {
      const filterLoc  = filterBy.location
      return  space.amenities.includes(filterBy.amenity)
      && filterBy.amenities.foreach(amenity => space.amenities.includes(amenity))
      //TODO try using google api to search by location
      && space.loc.address.includes(filterLoc) || space.loc.countryCode.includes(filterLoc) || space.loc.country.includes(filterLoc)
      && space.capacity <= filterBy.numGuests
    })

    //sort by reviews
    spaces = spaces.sort((space1, space2) => {
      return space1.getAverageReview(space1) - space2.getAverageReview(space2)
    })

    //slice out the amount you want - THIS WILL HAPPEN IN FRONT END so fewer server calls
    let spacesForDisplay = spaces.slice(0, filterBy.count)
    
    return spacesForDisplay;
  }

  var rate = {
    "cleanliness":2,
    "checkin":3,
    "communication":3,
    "accuracy":1,
    "value":5,
    "location":3
  }


function getAverageReview(space){
    const reviewSum = space.reviews.reduce(sum, review => {
        return sum + getReviewRate(review)
    })
    return reviewSum / space.reviews.length

}

function getReviewRate(review){
    var rates = review.rates;
    totalRates = Object.values(rates).reduce((sum, rate) => sum + rate)
    return totalRates / Object.values(rates).length // or '/ 6'
}
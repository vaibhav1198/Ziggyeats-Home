const connection = require('../utilities/connections');

var restaurantModel = {};

//model to fetch all restaurants
restaurantModel.mGetRestaurants = () => {
    return connection.getRestaurants().then((model) => {
        return model.find({}, {}).then((restaurants) => {
            if (restaurants.length == 0) return null;
            else {
                return restaurants;
            }
        })
    })

}
//model to insert restaurant
restaurantModel.mInsertRestaurant = (restaurant) => {
    //console.log(restaurant)
    return connection.getRestaurants().then((model) => {
        return model.find({ restaurantName: restaurant.restaurantName }).then((response1) => {
            if (response1 == 0) {
                return model.create(restaurant).then((response2) => {
                    if (response2) return restaurant.restaurantName
                    else return null;
                })
            }
            else return null;
        })
    })
}

//model to insert restaurant request
restaurantModel.mInsertRestaurantRequest = (restaurant) => {
    //console.log(restaurant)
    return connection.getRestaurantsRequest().then((model) => {
        return model.find({ restaurantName: restaurant.restaurantName }).then((response1) => {
            if (response1 == 0) {
                return model.create(restaurant).then((response2) => {
                    if (response2) return restaurant.restaurantName
                    else return null;
                })
            }
            else return null;
        })
    })
}

//get restaurants by location model
restaurantModel.mGetRestaurantsByLocation = (location) => {
    return connection.getRestaurants().then((model) => {
        return model.find({ location: location }, { _id: 0, restaurantName: 1 })
            .then((restaurants) => {
                //console.log(restaurants)
                if (restaurants.length != 0) return restaurants;
                else return null;
            })
    })
}

// get restaurants details by location
restaurantModel.mGetRestaurantDetailsByLocation = (location) => {
    return connection.getRestaurants().then((model) => {
        return model.find({ location: location }, { _id: 0 })
            .then((restaurantsList) => {
                //console.log(restaurantsList)
                if (restaurantsList.length != 0) return restaurantsList;
                else return null;
            })
    })
}

//details of particular restaurant
restaurantModel.mGetRestaurantDetails = (restaurantName) => {
    return connection.getRestaurants().then((model) => {
        return model.find({ restaurantName: restaurantName }, { _id: 0 })
            .then((details) => {
                //console.log(details)
                if (details.length != 0) return details;
                else return null;
            })
    })
}

//get restaurants by trendcount
restaurantModel.mGetRestaurantsByTrendCount = () => {
    return connection.getRestaurants().then((model) => {
        return model.find({}, { _id: 0, restaurantName: 1, location: 1, ratings: 1 }).sort({ trendCount: -1 }).then((res) => {
            if (res) {
                var restaurants = [];
                for (var i = 0; i < 5; i++) {
                    restaurants.push(res[i])
                }

                return restaurants;
            }
            else return null;
        })
    })
}

//get restaurants by trendcount
restaurantModel.mGetRestaurantsByRatings = (location) => {
    return connection.getRestaurants(location).then((model) => {
        return model.find({ location: location }, { _id: 0, restaurantName: 1, location: 1, ratings: 1, image: 1 }).sort({ ratings: -1 }).then((res) => {
            if (res) {
                var restaurants = [];
                for (var i = 0; i < 5; i++) {
                    restaurants.push(res[i])
                }

                return restaurants;
            }
            else return null;
        })
    })
}


restaurantModel.mUpdateRestaurant = (restaurant) => {

    if (restaurant.hasOwnProperty('delete')) {
        return connection.getRestaurants().then((model) => {
            return model.deleteOne({ restaurantName: restaurant.restaurantName }).then((response) => {
                response.restaurantName = restaurant.restaurantName
                return response
            })
        })
    }
    return connection.getRestaurants().then((model) => {
        return model.deleteOne({ restaurantName: restaurant.restaurantName }).then((resposne) => {
            return model.create(restaurant).then((response2) => {
                if (response2) {
                    return restaurant;
                }
                else {
                    return null;
                }
            })
        })
    })

}


restaurantModel.mInsertReview = (restaurantName, review) => {

    //console.log(restaurantName)
    return connection.getRestaurants().then((model) => {
        return model.updateOne({ restaurantName: restaurantName }, { $push: { reviews: review } }).then((response) => {
            if (response.nModified == 1) {
                return connection.getAuthentications().then((authModel) => {
                    console.log(review, "pppp")
                    var reviewObj = {
                        review: review.review,
                        restaurantName: restaurantName
                    }
                    console.log(reviewObj)
                    return authModel.updateOne({ customerId: Number(review.customerId) }, { $push: { reviews: reviewObj } }).then((response2) => {
                        console.log(response2)
                        if (response2.nModified == 1) {
                            return response;
                        }
                    })
                })

            }
            else return null
        })
    })
}


restaurantModel.mGiveRating = (restaurantName, rating) => {

    return connection.getRestaurants().then((model) => {
        return model.findOne({ restaurantName: restaurantName }, { _id: 0, ratings: 1, ratingCount: 1, ratingsArr: 1 }).then((response) => {
            if (response) {
                //var newRatings = (response.ratings + rating)/(response.ratingCount+1)
                var newRatings = 0;
                for (var i = 0; i < response.ratingsArr.length; i++) {
                    newRatings = newRatings + response.ratingsArr[i]
                }
                var updatededRating = (newRatings + rating) / (response.ratingCount + 1)
                return model.updateOne({ restaurantName: restaurantName }, { $push: { ratingsArr: rating } }).then((response1) => {
                    if (response1) {
                        return model.updateOne({ restaurantName: restaurantName }, { $set: { ratings: updatededRating, ratingCount: response.ratingCount + 1 } }).then((response2) => {
                            //console.log(response2)
                        })
                    }
                })
            }
        })
    })
}

restaurantModel.mGetRestaurantsByTrendCountLoc = (location) => {
    if (location == "Mysuru") location = "Mysore";
    return connection.getRestaurants().then((model) => {
        return model.find({ location: location }, { _id: 0, restaurantName: 1, category: 1, location: 1, ratings: 1, image: 1 }).sort({ trendCount: -1 }).then((response) => {
            if (response) {
                var restaurants = [];
                for (var i = 0; i < 5; i++) {
                    restaurants.push(response[i])
                }

                return restaurants;
            }
            else return null;
        })
    })
}



//restaurantModel.mInsertRestaurant({ restaurantName: 'Soosd Da Dhabha' })



//Model to fetch pending restaurants requests
restaurantModel.mGetPendingRestaurants = () => {
    return connection.getRestaurantsRequest().then((model) => {
        return model.find({}, {}).then((restaurants) => {
                return restaurants;
        })
    })
}

//Model to reject pending restaurants requests
restaurantModel.mRejectRestaurantRequest = (restaurantName) => {
    return connection.getRestaurantsRequest().then((model) => {
        return model.deleteOne({ restaurantName: restaurantName }).then((response) => {
            console.log(response);
            return response;
        })
    })
}



module.exports = restaurantModel;

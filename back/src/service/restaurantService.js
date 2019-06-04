const validator = require('../utilities/validator');
const restaurantModel = require('../model/restaurantModel');
const restaurantService = {};

//service to fetch all restaurants
restaurantService.getRestaurants = () => {
    return restaurantModel.mGetRestaurants().then((restaurants) => {
        if (restaurants == null) {
            var err = new Error('No restaurants found');
            err.status = 400;
            throw err;
        }
        else {
            return restaurants;
        }
    })

}
//insert into restaurant
restaurantService.insertRestaurant = (restaurant) => {
    return restaurantModel.mInsertRestaurant(restaurant).then((restaurantName) => {
        if (restaurantName == null) {
            var err = new Error('Insertion failed');
            err.status = 400;
            throw err;
        }
        else {
            return restaurantName;
        }
    })
}

//insert into restaurant request
restaurantService.insertRestaurantRequest = (restaurant) => {
    return restaurantModel.mInsertRestaurantRequest(restaurant).then((restaurantName) => {
        if (restaurantName == null) {
            var err = new Error('Insertion failed');
            err.status = 400;
            throw err;
        }
        else {
            return restaurantName;
        }
    })
}

//get restaurant by location

restaurantService.getRestaurantsByLocation = (location) => {
    if (location == "Mysuru") location = "Mysore";
    return restaurantModel.mGetRestaurantsByLocation(location).then((restaurants) => {
        if (restaurants) return restaurants
        else {
            var err = new Error('No restaurants found in the specific location');
            err.status = 400;
            throw err;
        }
    })
}

//get details of particular restaurant
restaurantService.getRestaurantsDetails = (restaurantName) => {
    //console.log(restaurantName)
    return restaurantModel.mGetRestaurantDetails(restaurantName).then((details) => {
        if (details) return details
        else {
            var err = new Error('No details found of selected restaurant');
            err.status = 400;
            throw err;
        }
    })
}

//service to update restaurant

restaurantService.updateRestaurant = (restaurant) => {
    return restaurantModel.mUpdateRestaurant(restaurant).then((response) => {
        if (response) return response;
        else {
            var err = Error('Cannot update restaurant')
            err.status = 400;
            throw err;
        }
    })
}


//get details of restaurants by location
restaurantService.getRestaurantsDetailsByLocation = (location) => {
    //console.log(location)
    if (location == "Mysuru") location = "Mysore";
    return restaurantModel.mGetRestaurantDetailsByLocation(location).then((detailsList) => {
        if (detailsList) return detailsList
        else {
            var err = new Error('No restaurant in selected location');
            err.status = 400;
            throw err;
        }
    })
}

//service to get restaurants by trend count
restaurantService.getRestaurantsByTrendCount = () => {
    return restaurantModel.mGetRestaurantsByTrendCount().then((restaurants) => {
        if (restaurants) {
            return restaurants
        }
        else {
            var err = new Error('No restaurants found');
            err.status = 400;
            throw err;
        }
    })
        .catch((err) => {

        })
}

//service to get restaurants by ratings
restaurantService.getRestaurantsByRatings = (location) => {
    if (location == "Mysuru") location = "Mysore";
    return restaurantModel.mGetRestaurantsByRatings(location).then((restaurants) => {
        if (restaurants) {
            return restaurants
        }
        else {
            var err = new Error('No restaurants found');
            err.status = 400;
            throw err;
        }
    })
        .catch((err) => {

        })
}


// service to insert review
restaurantService.insertReview = (restaurantName, review) => {

    return restaurantModel.mInsertReview(restaurantName, review).then((response) => {
        if (response) return response;
        else {
            var err = new Error("Can't add review");
            err.status = 400;
            throw err;
        }
    })

}

restaurantService.giveRating = (restaurantName, rating) => {
    return restaurantModel.mGiveRating(restaurantName, rating).then((response) => {

    })
}


restaurantService.getRestaurantsByTrendCountLoc = (location) => {
    if (location == "Mysuru") lcoation = "Mysore";
    return restaurantModel.mGetRestaurantsByTrendCountLoc(location).then((restaurants) => {
        if (restaurants) return restaurants;
        else {
            var err = new Error("Error in fetching restaurants");
            err.status = 400;
            throw new err;
        }
    })
}





//Service to fetch pending restaurant requests
restaurantService.getPendingRestaurants = () => {
    return restaurantModel.mGetPendingRestaurants().then((restaurants) => {
        if (restaurants == null) {
            var err = new Error('No restaurants found with pending overview');
            err.status = 400;
            throw err;
        }
        else {
            return restaurants;
        }
    })
}

//Service to reject a pending restaurant request
restaurantService.rejectRestaurantRequest = (restaurantName) => {
    return restaurantModel.mRejectRestaurantRequest(restaurantName).then((restaurantName) => {
        if (restaurantName == null) {
            var err = new Error('Deletion failed');
            err.status = 400;
            throw err;
        }
        else {
            return restaurantName;
        }
    })
}



module.exports = restaurantService;

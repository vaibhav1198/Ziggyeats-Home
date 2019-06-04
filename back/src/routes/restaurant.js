const express = require('express');
const route1 = express.Router();
const authService = require('../service/authService');
const restaurantService = require('../service/restaurantService');
const Register = require('../model_structure/register');
const Login = require('../model_structure/login');
const Restaurant = require('../model_structure/restaurant');
const create = require('../model_structure/dbSetup');
const Order = require('../model_structure/Order');
const orderService = require('../service/orderService');

//route to fetch all restaurants
route1.get('/getRestaurants', (req, res, next) => {
    restaurantService.getRestaurants().then((restaurants) => {
        res.json({ 'message': restaurants });
    })
        .catch((err) => {
            next(err);
        })
})


//list of restaurant names by location
route1.get('/getRestaurants/:location', (req, res, next) => {
    restaurantService.getRestaurantsByLocation(req.params.location)
        .then((restaurants) => {
            res.json({ 'message': restaurants })
        })
        .catch((err) => {
            next(err);
        })
})

//update restaurant

route1.put('/updateRestaurant', (req, res, next) => {
    //console.log(req.body)

    restaurantService.updateRestaurant(req.body).then((response) => {

        if (response.n) {
            res.json({ "message": response.restaurantName + " removed from ZiggyEats!" })
        }
        res.json({ "message": response.restaurantName + " updated successfully!" })
    })
        .catch((err) => {
            next(err)
        })

})
//list of restaurant details by location

route1.get('/getRestaurantsDetails/:location', (req, res, next) => {
    restaurantService.getRestaurantsDetailsByLocation(req.params.location)
        .then((restaurantsDetails) => {
            //console.log(restaurantsDetails, "sssss")
            res.json({ 'message': restaurantsDetails })
        })
        .catch((err) => {
            next(err);
        })
})

//getting particular restaurant details
route1.get('/getRestaurantDetails/:restaurantName', (req, res, next) => {
    //console.log(req.params.restaurantName)
    restaurantService.getRestaurantsDetails(req.params.restaurantName)
        .then((details) => {
            res.json({ 'message': details })
        })
        .catch((err) => {
            next(err);
        })
})


//route for inserting restaurant
route1.post('/insertRestaurant', (req, res, next) => {
    //console.log("route", req.body)
    var restaurant = new Restaurant(req.body);
    restaurantService.insertRestaurant(restaurant).then((restaurantName) => {
        res.json({ 'message': restaurantName + ' inserted!' })
    })
        .catch((err) => {
            next(err);
        })
})

//route for inserting restaurant request
route1.post('/insertRestaurantRequest', (req, res, next) => {
    //console.log("route", req.body)
    var restaurant = new Restaurant(req.body);
    restaurantService.insertRestaurantRequest(restaurant).then((restaurantName) => {
        res.json({ 'message': restaurantName + ' inserted!' })
    })
        .catch((err) => {
            next(err);
        })
})

route1.get('/getRestaurantsByTrendCount', (req, res, next) => {
    restaurantService.getRestaurantsByTrendCount()
        .then((restaurants) => {
            res.json({ 'message': restaurants })
        })
        .catch((err) => {
            next(err);
        })
})

//get restaurant by ratings
route1.get('/getRestaurantsByRatings/:location', (req, res, next) => {
    restaurantService.getRestaurantsByRatings(req.params.location)
        .then((restaurants) => {
            res.json({ 'message': restaurants })
        })
        .catch((err) => {
            next(err);
        })
})


//insert review

route1.post('/insertReview/:restaurantName', (req, res, next) => {
    //console.log(req.params)
    restaurantService.insertReview(req.params.restaurantName, req.body).then((response) => {
        res.json({ "message": "Thanks for adding review" })
    })
        .catch((err) => {
            next(err)
        })
})

route1.post('/giveRating/:restaurantName', (req, res, next) => {
    restaurantService.giveRating(req.params.restaurantName, req.body.ratings).then((response) => {
        res.json({ "message": "Rated" })
    })
        .catch((err) => {
            next(err)
        })
})

route1.get('/getRestaurantsByTrendCountLoc/:location', (req, res, next) => {
    restaurantService.getRestaurantsByTrendCountLoc(req.params.location).then((response) => {
        res.json({ "message": response });
    })
        .catch((err) => {
            next(err)
        })

})


//Route to get Pending restaurants requests
route1.get('/getPendingRestaurants', (req, res, next) => {

    restaurantService.getPendingRestaurants().then((restaurants) => {
        res.json({ 'message': restaurants });
    })
        .catch((err) => {
            next(err);
        })
})

//Route to reject a pending restaurant request
route1.delete('/rejectRestaurantRequest/:restaurantName', (req, res, next) => {

    restaurantService.rejectRestaurantRequest(req.params.restaurantName).then((response) => {

        res.json({ "message": " rejected" })
    })
        .catch((err) => {
            next(err);
        })
})

module.exports = route1;
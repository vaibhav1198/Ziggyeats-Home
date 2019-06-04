const express = require('express');
const router = express.Router();
const authService = require('../service/authService');
const restaurantService = require('../service/restaurantService');
const Register = require('../model_structure/register');
const Login = require('../model_structure/login');
const Restaurant = require('../model_structure/restaurant');
const create = require('../model_structure/dbSetup');
const Order = require('../model_structure/Order')
const orderService = require('../service/orderService')
//setup database
router.get('/setupDB', (req, res, next) => {
    create.setupDb()
        .then((res1) => {
            //console.log(res1)
            res.send(res1)
        })
        .catch((err) => {
            next(err);
        })

})
//route for registration
router.post('/register', (req, res, next) => {
    const user = new Register(req.body);
    //console.log("body", user)
    authService.register(user)
        .then((customerId) => {
            res.json({ 'message': 'Registration successful for ' + user.name + ' with customerId ' + customerId })
        })
        .catch((err) => {
            next(err)
        })
})
//route for login
router.post('/login', (req, res, next) => {
    const user = new Login(req.body);
    authService.login(user).then((userObj) => {
        res.send(userObj)
    })
        .catch((err) => {
            next(err);
        })

})

router.post('/insertLoginUser', (req, res, next) => {
    //console.log(req.body)
    authService.insertLoginUser(req.body).then((response) => {
        res.json({ 'message': response });
    })
        .catch((err) => {
            next(err);
        })
})

router.get('/getLoginUser/:custId', (req, res, next) => {

    authService.getLoginUser(req.params.custId).then((user) => {
        res.json({ 'message': user })
    })
        .catch((err) => {
            next(err);
        })
})

router.delete('/deleteLoginUser/:custId', (req, res, next) => {
    //console.log("11111")
    authService.deleteLoginUser(req.params.custId).then((user) => {
        //console.log("user", user)
        res.json({ 'message': user })
    })
        .catch((err) => {
            next(err);
        })
})


//route to fetch all restaurants
router.get('/getRestaurants', (req, res, next) => {
    restaurantService.getRestaurants().then((restaurants) => {
        res.json({ 'message': restaurants });
    })
        .catch((err) => {
            next(err);
        })
})

//list of restaurant names by location
router.get('/getRestaurants/:location', (req, res, next) => {
    restaurantService.getRestaurantsByLocation(req.params.location)
        .then((restaurants) => {
            res.json({ 'message': restaurants })
        })
        .catch((err) => {
            next(err);
        })
})

//update restaurant

router.put('/updateRestaurant', (req, res, next) => {
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

router.get('/getRestaurantsDetails/:location', (req, res, next) => {
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
router.get('/getRestaurantDetails/:restaurantName', (req, res, next) => {
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
router.post('/insertRestaurant', (req, res, next) => {
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
router.post('/insertRestaurantRequest', (req, res, next) => {
    //console.log("route", req.body)
    var restaurant = new Restaurant(req.body);
    restaurantService.insertRestaurantRequest(restaurant).then((restaurantName) => {
        res.json({ 'message': restaurantName + ' inserted!' })
    })
        .catch((err) => {
            next(err);
        })
})

router.get('/getdetails/:customerId', (req, res, next) => {
    authService.getDetails(req.params.customerId)
        .then((response) => {
            res.json({ "message": response[0] })
        })
        .catch((err) => {
            next(err)
        })
})


//get restaurants by trendCount

router.get('/getRestaurantsByTrendCount', (req, res, next) => {
    restaurantService.getRestaurantsByTrendCount()
        .then((restaurants) => {
            res.json({ 'message': restaurants })
        })
        .catch((err) => {
            next(err);
        })
})

//get restaurant by ratings
router.get('/getRestaurantsByRatings/:location', (req, res, next) => {
    restaurantService.getRestaurantsByRatings(req.params.location)
        .then((restaurants) => {
            res.json({ 'message': restaurants })
        })
        .catch((err) => {
            next(err);
        })
})

//inserting order
router.post('/insertOrder/:customerId', (req, res, next) => {
    const order = new Order(req.body);
    orderService.insertOrder(order, req.params.customerId).then((response) => {
        res.json({ "message": "Your order has been placed!" })
    })
        .catch((err) => {
            next(err);
        })

})

//insert review

router.post('/insertReview/:restaurantName', (req, res, next) => {
    //console.log(req.params)
    restaurantService.insertReview(req.params.restaurantName, req.body).then((response) => {
        res.json({ "message": "Thanks for adding review" })
    })
        .catch((err) => {
            next(err)
        })
})

router.post('/giveRating/:restaurantName', (req, res, next) => {
    restaurantService.giveRating(req.params.restaurantName, req.body.ratings).then((response) => {
        res.json({ "message": "Rated" })
    })
        .catch((err) => {
            next(err)
        })
})

// get customer details
router.get('/getCustomerDetails/:customerId', (req, res, next) => {
    //console.log(req.params)
    authService.getDetails(req.params.customerId).then((data) => {
        res.json({ "message": data })
    })
        .catch((err) => {
            next(err)
        })
})

// update customer details
router.post('/updateDetails', (req, res, next) => {
    const user = new Register(req.body);
    //console.log("body", user)
    authService.updateDetails(user)
        .then((customerId) => {
            res.json({ 'message': 'Your data is updated'})
        })
        .catch((err) => {
            next(err)
        })
})


// route to decrease coupons
router.post('/decreaseCoupons/:customerId', (req, res, next) => {
    authService.decreaseCoupons(req.params.customerId).then((response) => {
        res.json({ "message": "coupon updated" })
    })
        .catch((err) => {
            next(err)
        })

})

router.get('/getRestaurantsByTrendCountLoc/:location', (req, res, next) => {
    restaurantService.getRestaurantsByTrendCountLoc(req.params.location).then((response) => {
        res.json({ "message": response });
    })
        .catch((err) => {
            next(err)
        })

})


router.get('/getOrderHistory', (req, res, next) => {
    orderService.getOrderHistory().then((response) => {
        res.json({ "message": response })
    })
        .catch((err) => {
            next(err);
        })
})

router.put('/updateOrderStatus', (req, res, next) => {
    console.log(req.body)
    orderService.updateOrderStatus(req.body).then((response) => {
        res.json({ "message": "status updated" })
    })
        .catch((err) => {
            next(err);
        })
})


//Route to get Pending restaurants requests
router.get('/getPendingRestaurants', (req, res, next) => {

    restaurantService.getPendingRestaurants().then((restaurants) => {
        res.json({ 'message': restaurants });
    })
        .catch((err) => {
            next(err);
        })
})

//Route to reject a pending restaurant request
router.delete('/rejectRestaurantRequest/:restaurantName', (req, res, next) => {

    restaurantService.rejectRestaurantRequest(req.params.restaurantName).then((response) => {

        res.json({ "message": " rejected" })
    })
        .catch((err) => {
            next(err);
        })
})



module.exports = router;

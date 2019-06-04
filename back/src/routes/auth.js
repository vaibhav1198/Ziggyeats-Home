const express = require('express');
const route3 = express.Router();
const authService = require('../service/authService');
const restaurantService = require('../service/restaurantService');
const Register = require('../model_structure/register');
const Login = require('../model_structure/login');
const Restaurant = require('../model_structure/restaurant');
const create = require('../model_structure/dbSetup');
const Order = require('../model_structure/Order')
const orderService = require('../service/orderService');

//setup database
route3.get('/setupDB', (req, res, next) => {
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
route3.post('/register', (req, res, next) => {
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
route3.post('/login', (req, res, next) => {
    const user = new Login(req.body);
    authService.login(user).then((userObj) => {
        res.send(userObj)
    })
        .catch((err) => {
            next(err);
        })

})

route3.post('/insertLoginUser', (req, res, next) => {
    //console.log(req.body)
    authService.insertLoginUser(req.body).then((response) => {
        res.json({ 'message': response });
    })
        .catch((err) => {
            next(err);
        })
})

route3.get('/getLoginUser/:custId', (req, res, next) => {

    authService.getLoginUser(req.params.custId).then((user) => {
        res.json({ 'message': user })
    })
        .catch((err) => {
            next(err);
        })
})

route3.delete('/deleteLoginUser/:custId', (req, res, next) => {
    //console.log("11111")
    authService.deleteLoginUser(req.params.custId).then((user) => {
        //console.log("user", user)
        res.json({ 'message': user })
    })
        .catch((err) => {
            next(err);
        })
})


route3.get('/getdetails/:customerId', (req, res, next) => {
    authService.getDetails(req.params.customerId)
        .then((response) => {
            res.json({ "message": response[0] })
        })
        .catch((err) => {
            next(err)
        })
})


// get customer details
route3.get('/getCustomerDetails/:customerId', (req, res, next) => {
    //console.log(req.params)
    authService.getDetails(req.params.customerId).then((data) => {
        res.json({ "message": data })
    })
        .catch((err) => {
            next(err)
        })
})

// update customer details
route3.post('/updateDetails', (req, res, next) => {
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
route3.post('/decreaseCoupons/:customerId', (req, res, next) => {
    authService.decreaseCoupons(req.params.customerId).then((response) => {
        res.json({ "message": "coupon updated" })
    })
        .catch((err) => {
            next(err)
        })

})

module.exports = route3;


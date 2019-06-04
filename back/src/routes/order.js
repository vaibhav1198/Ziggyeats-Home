const express = require('express');
const route2 = express.Router();
const authService = require('../service/authService');
const restaurantService = require('../service/restaurantService');
const Register = require('../model_structure/register');
const Login = require('../model_structure/login');
const Restaurant = require('../model_structure/restaurant');
const create = require('../model_structure/dbSetup');
const Order = require('../model_structure/Order');
const orderService = require('../service/orderService');


route2.get('/getOrderHistory', (req, res, next) => {
    orderService.getOrderHistory().then((response) => {
        res.json({ "message": response })
    })
        .catch((err) => {
            next(err);
        })
})

route2.get('/getOrderHistory/:location', (req, res, next) => {
    console.log(req.params.location)
    orderService.getOrderHistoryByLocation(req.params.location).then((response) => {
        res.json({ "message": response })
    })
        .catch((err) => {
            next(err);
        })
})

route2.put('/updateOrderStatus', (req, res, next) => {
    console.log(req.body)
    orderService.updateOrderStatus(req.body).then((response) => {
        res.json({ "message": "status updated" })
    })
        .catch((err) => {
            next(err);
        })
})

//inserting order
route2.post('/insertOrder/:customerId', (req, res, next) => {
    const order = new Order(req.body);
    console.log(order)
    orderService.insertOrder(order, req.params.customerId).then((response) => {
        res.json({ "message": "Your order has been placed!" })
    })
        .catch((err) => {
            next(err);
        })

})

module.exports = route2;
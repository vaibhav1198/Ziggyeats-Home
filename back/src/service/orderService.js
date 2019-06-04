const orderModel = require('../model/orderModel');
const orderService = {};

orderService.insertOrder = (order,customerId) =>{
    return orderModel.mInsertOrder(order,customerId)
    .then((response)=>{
        //console.log(response)
        if(response) return response;
        else{
            var err = new Error('Cannot insert order in database');
            err.status = 400;
            throw err;
        }
    })
}

orderService.getOrderHistory = () =>{
    return orderModel.mGetOrderHistory().then((response)=>{
        if(response) return response;
        else{
            var err = new Error("Error in fetching restaurant");
            err.status = 400;
            throw err;
        }
    })
}
orderService.getOrderHistoryByLocation = (location) =>{
    return orderModel.mGetOrderHistoryByLocation(location).then((response)=>{
        if(response) return response;
        else{
            var err = new Error("Error in fetching restaurant");
            err.status = 400;
            throw err;
        }
    })
}


orderService.updateOrderStatus = (orderObj) =>{
    return orderModel.mUpdateOrderStatus(orderObj).then((response)=>{
        if(response) return response;
        else{
            var err = new Error("Error in update order status");
            err.status =  400;
            throw err;
        }
    })
}

module.exports = orderService;

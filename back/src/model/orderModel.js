const connection = require("../utilities/connections");
const orderModel = {};

orderModel.generateOrderId = () => {
  return connection.getOrderHistory().then(model => {
    return model.find({}, { _id: 0, orderId: 1 }).then(orderIdArr => {
      if (orderIdArr.length == 0) {
        return 1;
      } else {
        var lastId = Number(orderIdArr[orderIdArr.length - 1].orderId);
        return lastId + 1;
      }
    });
  });
};

orderModel.mInsertOrderByCustomerId = (order, customerId) => {
  connection.getAuthentications().then(model => {
    model.find({ customerId: customerId }, {}).then(response => {
      if (response) {
        model
          .updateOne({ customerId: customerId }, { $push: { orders: order } })
          .then(response1 => {
            console.log(response1);
          });
      }
    });
  });
};

orderModel.mIncreaseTrendCount = orderRestaurantName => {
  return connection.getRestaurants().then(model => {
    return model
      .findOne(
        { restaurantName: orderRestaurantName },
        { _id: 0, trendCount: 1 }
      )
      .then(trendCount => {
        return model.updateOne({ restaurantName: orderRestaurantName }, { $set: { trendCount: trendCount.trendCount + 1 } })
          .then(response => {
            return response.nModified;
          });
      });
  });
};

orderModel.mInsertOrder = (order, customerId) => {

  orderModel.mIncreaseTrendCount(order.orderRestaurantName)

  return connection.getOrderHistory().then(model => {
    return orderModel.generateOrderId().then(orderId => {
      order.orderId = orderId;
      console.log(orderId, "id");

      return model.create(order).then(response => {
        console.log(response)
        if (response) {
          orderModel.mInsertOrderByCustomerId(order, customerId);
          return response;
        }
        else return null;
      });
    });
  });
};

orderModel.mGetOrderHistory = () => {
  return connection.getOrderHistory().then((model) => {
    return model.find({}, {}).then((orders) => {
      // if(orders.length>0){
      //   return orders
      // }
      // else return null;
      return orders
    })
  })
}
orderModel.mGetOrderHistoryByLocation = (location) => {
  return connection.getOrderHistory().then((model) => {
    return model.find({ location: location }, {}).then((orders) => {
      // console.log(orders)
      return orders
    })
    })
}

orderModel.mUpdateOrderStatus = (orderObj) => {
  return connection.getOrderHistory().then((orderModel) => {
    return connection.getAuthentications().then((customerModel) => {
      return customerModel.updateOne({ customerId: orderObj.customerId, orders: { $elemMatch: { orderId: orderObj.orderId } } }, { $set: { "orders.$.orderStatus": orderObj.orderStatus } }).then((response1) => {
        if (response1.n == 1) {
          return orderModel.updateOne({ orderId: orderObj.orderId }, { $set: { orderStatus: orderObj.orderStatus } }).then((response2) => {
            if (response2.n == 1) {
              return response2;
            }
            else return null;
          })
        }
        else return null;
      })
    })
  })
}
// orderModel.mUpdateOrderStatus({customerId: 3, orderId: 3})
module.exports = orderModel;

class Order {
    constructor(obj) {
        this.orderRestaurantName = obj.orderRestaurantName;
        this.orderPrice = obj.price;
        this.order = obj.order;
        this.orderQuantity = obj.quantity;
        this.orderStatus = obj.orderStatus;
        this.customerId = obj.customerId;
        this.time = obj.time;
        this.location = obj.location;
    }
}

module.exports = Order;

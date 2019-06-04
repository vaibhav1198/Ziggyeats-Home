const { Schema } = require("mongoose");
const Mongoose = require("mongoose")
Mongoose.Promise = global.Promise;
const url = "mongodb://localhost:27017/food-delivery";
//
const loggedinUserSchema = Schema({
    customerId: { type: Number, required: true },
    admin: { type: Boolean, default: false }
}, { collection: 'loggedinUser' })

//user review schema history
const userReviewSchema = Schema({
    review: { type: String },
    restaurantName: { type: String }
})
//user order history schema
const userOrdersSchema = Schema({
    orderId: { type: Number, required: true },
    orderRestaurantName: { type: String, required: true },
    orderPrice: { type: Number, required: true },
    orderStatus: { type: String },
    location: { type: String },
    order: { type: [], required: true },
    orderQuantity: { type: Number, required: true },
    time: { type: Number }
})

//Athentication schema
const authSchema = Schema({
    name: { type: String },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    admin: { type: Boolean, default: false },
    rOwner: { type: Boolean, default: false },
    phone: { type: Number, unique: true, required: true },
    address: { type: String },
    customerId: { type: Number, required: true, unique: true },
    reviews: { type: [userReviewSchema], default: [] },
    orders: { type: [userOrdersSchema], default: [] },
    coupons: { type: Number, default: 5 }

}, { collection: 'Auth' })
//menu schema
const menuSchema = Schema({
    dishName: { type: String, required: true, unique: false },
    price: { type: Number, required: true, min: [0, 'price should be greater than 0'] },
    available: { type: Boolean, default: true }
})
//review schema
const reviewSchema = Schema({
    review: { type: String },
    reviewBy: { type: String }
})


//Overview schema
const overviewSchema = Schema({
    heading: { type: String, default: "This is one of the best place in city. Top quality food is available here with reasonable price." },
    phone: { type: Number, default: 9447631301 },
    priceForTwo: { type: Number, default: 550 },
    paymentType: { type: String, default: 'Cash on Delivery and PayTm' },
    extra: { type: String, default: 'All Day Breakfast, Brunch, Indoor Seating, Outdoor Seating.' },
})

//Restaurants schema
const restaurantSchema = Schema({
    restaurantName: { type: String, unique: true, required: true },
    location: { type: String, required: true },
    reviews: { type: [reviewSchema], default: [] },
    overview: { type: [overviewSchema], default:[overviewSchema] },
    ratings: { type: Number, default: 100 },
    ratingsArr: { type: [Number], default: [100] },
    ratingCount: { type: Number, default: 1 },
    menu: { type: [menuSchema], required: true },
    trendCount: { type: Number, default: 0 },
    priceForTwo: { type: Number, default: 250 },
    category: { type: String, default: 'Fine Dining' },
    meals: { type: [String], default: ['Lunch'] },
    image: { type: String, default: 'uploaded' },
}, { collection: 'restaurant' })

//Restaurants schema
const restaurantRequestSchema = Schema({
    restaurantName: { type: String, unique: true, required: true },
    location: { type: String, required: true },
    reviews: { type: [reviewSchema], default: [] },
    overview: { type: String, default: "Overview is pending" },
    ratings: { type: Number, default: 100 },
    ratingsArr: { type: [Number], default: [100] },
    ratingCount: { type: Number, default: 1 },
    menu: { type: [menuSchema], required: true },
    trendCount: { type: Number, default: 0 },
    priceForTwo: { type: Number, default: 250 },
    category: { type: String, default: 'category' },
    meals: { type: [String], default: ['Lunch'] },
    image: { type: String, default: 'uploaded' },
}, { collection: 'restaurantRequest' })

//order history
const orderHistorySchema = Schema({
    orderId: { type: Number, required: true },
    orderRestaurantName: { type: String, required: true },
    orderPrice: { type: Number, required: true },
    orderStatus: { type: String },
    location: { type: String },
    order: { type: [], required: true },
    orderQuantity: { type: Number, required: true },
    customerId: { type: Number, required: true },
    time: { type: Number }
}, { collection: 'orderHistory' })



let collections = {}


collections.getRestaurants = () => {

    return Mongoose.connect(url, { useNewUrlParser: true }).then((database) => {
        return database.model('restaurant', restaurantSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

collections.getRestaurantsRequest = () => {

    return Mongoose.connect(url, { useNewUrlParser: true }).then((database) => {
        return database.model('restaurantRequest', restaurantRequestSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

collections.getAuthentications = () => {
    return Mongoose.connect(url, { useNewUrlParser: true }).then((database) => {
        return database.model('Auth', authSchema)
    }).catch((error) => {
        let err = new Error("Could not connect to Database");
        err.status = 500;
        throw err;
    })
}

collections.getLoginUsers = () => {
    return Mongoose.connect(url, { useNewUrlParser: true }).then((database) => {
        return database.model('loginUser', loggedinUserSchema)
    })
        .catch((error) => {
            let err = new Error("Could not connect to Database");
            err.status = 500;
            throw err;
        })
}

collections.getOrderHistory = () => {
    return Mongoose.connect(url, { useNewUrlParser: true }).then((database) => {
        return database.model('orderHistory', orderHistorySchema)
    })
        .catch((error) => {
            let err = new Error("Could not connect to Database");
            err.status = 500;
            throw err;
        })
}

module.exports = collections;

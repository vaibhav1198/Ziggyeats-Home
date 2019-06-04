class Restaurant {
    constructor(obj) {
        this.restaurantName = obj.restaurantName,
        this.location = obj.location,
        this.menu = obj.totalDishes,
        this.image = 'notUploaded'
    }
}

module.exports = Restaurant;
const collection = require('../utilities/connections');

const authDb = [
    {
        name: 'Vaibhav Gupta',
        password: 'Passwords2@',
        email: 'vgupta1198@gmail.com',
        phone: 9876581324,
        admin: true,
        rOwner: false,
        customerId: 0001
    },
    {
        name: 'Navraj Kaler',
        password: 'Passwords2@',
        email: 'jatt22kaler@yahoo.com',
        phone: 1234567891,
        rOwner: false,
        admin: true,
        customerId: 0002
    },
    {
        name: 'Mokshit Sood',
        password: 'Passwords2@',
        email: 'msood814@gmail.com',
        phone: 1234967891,
        rOwner: false,
        admin: true,
        customerId: 0003
    },
    {
        name: 'Vaibhav Gupta',
        password: 'Passwords2@',
        email: 'vgupta119@gmail.com',
        phone: 9876581321,
        admin: false,
        rOwner: true,
        address:'Chandigarh',
        customerId: 0004
    },
    {
        name: 'Navraj Kaler',
        password: 'Passwords2@',
        email: 'ratt22kaler@yahoo.com',
        phone: 8114667891,
        rOwner: true,
        address:'New Delhi',
        admin: false,
        customerId: 0005
    },
    {
        name: 'Mokshit Sood',
        password: 'Passwords2@',
        email: 'rsood814@gmail.com',
        phone: 6434967891,
        address:'Mysore',
        rOwner: true,
        admin: false,
        customerId: 0006
    }

]

const restaurantDb = [{
    restaurantName: "Kaler's Kitchen",
    location: 'Chandigarh',
    reviews: [
        {
            review: 'Best chicken in the city',
            reviewBy: 'Ramsay Gordan'
        }
    ],
    menu: [
        {
            dishName: 'Grilled Chicken',
            price: 400,
            available: true
        },
        {
            dishName: 'Special BBQ Chicken',
            price: 600,
            available: true
        },
        {
            dishName: 'Honey Grilled Chicken',
            price: 750,
            available: false
        }

    ],

    trendCount: 3,
    priceForTwo: 250,
    category: 'Fine Dining',
    meals: ['Breakfast', 'Lunch', 'Dinner']
},
{
    restaurantName: "Sood Da Dhaba",
    location: 'Chandigarh',
    reviews: [
        {
            review: 'Best dhahba ever',
            reviewBy: 'Sandeep khosla'

        }
    ],
    menu: [
        {
            dishName: 'Palak paneer',
            price: 150,
            available: true
        },
        {
            dishName: 'Chilli Chicken',
            price: 300,
            available: true
        },
        {
            dishName: 'Channa Chawal',
            price: 100,
            available: false
        }

    ],
    trendCount: 2,
    priceForTwo: 250,
    category: 'Fine Dining',
    meals: ['Breakfast', 'Lunch', 'Dinner']
},
{
    restaurantName: "Gupta Sweets",
    location: 'Chandigarh',
    reviews: [
        {
            review: 'Best sweets in the town',
            reviewBy: 'Rekesh Mahajan'
        },
        {
            review: 'All Freshly Prepared',
            reviewBy: 'Aman Gupta'
        }
    ],
    menu: [
        {
            dishName: 'Cholle Bhature',
            price: 120,
            available: true
        },
        {
            dishName: 'Dal Makhani',
            price: 180,
            available: true
        },
        {
            dishName: 'Chocolate Cake',
            price: 250,
            available: false
        }
    ],
    trendCount: 5,
    priceForTwo: 250,
    category: 'Bakery',
    meals: ['Breakfast', 'Lunch', 'Dinner']
}, 
{
    restaurantName: "The Kebab Factory",
    location: 'Chandigarh',
    reviews: [
        {
            review: 'food was not at all nice.',
            reviewBy: 'Preeti Singla'
        }

    ],
    menu: [
        {
            dishName: 'Tundey Kebab',
            price: 220,
            available: true
        },
        {
            dishName: 'Dahi Kebab',
            price: 230,
            available: true
        },
        {
            dishName: 'hara bhara kebab',
            price: 150,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Fine Dining',
    meals: ['Lunch', 'Dinner']
}, {
    restaurantName: "OvenFresh",
    location: 'Chandigarh',
    reviews: [
        {
            review: 'Best White sauce pasta ever.',
            reviewBy: 'Mokshit Sood'
        },
        {
            review: 'Amazing pancakes are available here.',
            reviewBy: 'Puneet Dhiman'
        }

    ],
    menu: [
        {
            dishName: 'Italiano Alfredo Pasta',
            price: 220,
            available: true
        },
        {
            dishName: 'Chocolate Pancake',
            price: 230,
            available: true
        },
        {
            dishName: 'Paneer Tikka Pizza',
            price: 300,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Cafe',
    meals: ['Breakfast', 'Lunch', 'Dinner']
},
{
    restaurantName: "Starbucks",
    location: 'Chandigarh',
    reviews: [
        {
            review: 'Not worth the money.',
            reviewBy: 'Manveet Kaur Rai'
        },
        {
            review: 'Best place to chill around in town.',
            reviewBy: 'Raagu Chawla'
        }

    ],
    menu: [
        {
            dishName: 'Americano',
            price: 220,
            available: true
        },
        {
            dishName: 'Expresso',
            price: 230,
            available: true
        },
        {
            dishName: 'Frappuccino',
            price: 280,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Cafe',
    meals: ['Breakfast', 'Lunch', 'Dinner']
},
{
    restaurantName: "Qizo",
    location: 'Chandigarh',
    reviews: [
        {
            review: 'Great ambience.',
            reviewBy: 'Malavika Jaishi'
        },
        {
            review: 'Best biryani ever.',
            reviewBy: 'Puneet Dhiman'
        }

    ],
    menu: [
        {
            dishName: 'Chicken Biryani',
            price: 300,
            available: true
        },
        {
            dishName: 'Veg Biryani aka veg pulao',
            price: 230,
            available: true
        },
        {
            dishName: 'Drought Beer',
            price: 200,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Fine Dining',
    meals: ['Lunch', 'Dinner']
},
{
    restaurantName: "Social",
    location: 'Chandigarh',
    reviews: [
        {
            review: 'great place to spend tour saturday nights.',
            reviewBy: 'Noori Mehta'
        },
        {
            review: 'Food is not that good',
            reviewBy: 'Preeti Garg'
        }

    ],
    menu: [
        {
            dishName: 'American Nachos',
            price: 250,
            available: true
        },
        {
            dishName: 'Chinese Sizzler',
            price: 220,
            available: true
        },
        {
            dishName: 'Pasta Arabiata',
            price: 280,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Cafe',
    meals: ['Lunch', 'Dinner']
},
{
    restaurantName: "Nik Bakers",
    location: 'Chandigarh',
    reviews: [
        {
            review: 'best desserts',
            reviewBy: 'Navraj Kaler'
        },
        {
            review: 'Amazing Cold Coffee',
            reviewBy: 'Navraj Kaler'
        }

    ],
    menu: [
        {
            dishName: 'Blueberry Cheese Cake',
            price: 160,
            available: true
        },
        {
            dishName: 'Kitkat Cake',
            price: 800,
            available: true
        },
        {
            dishName: 'Hot Dog',
            price: 300,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Bakery',
    meals: ['Lunch', 'Dinner']
},
{
    restaurantName: "Pirates Of Grill",
    location: 'Chandigarh',
    reviews: [
        {
            review: 'Amazing buffets.',
            reviewBy: 'Navraj Kaler'
        }
    ],
    menu: [
        {
            dishName: 'Non-Veg Buffet',
            price: 850,
            available: true
        },
        {
            dishName: 'Veg Buffet',
            price: 700,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Buffet',
    meals: ['Lunch', 'Dinner']
},
{
    restaurantName: "Barbeque Nation",
    location: 'Chandigarh',
    reviews: [
        {
            review: 'great place to go with family',
            reviewBy: 'Noori Mehta'
        }
    ],
    menu: [
        {
            dishName: 'Non-Vg Buffet',
            price: 750,
            available: true
        },
        {
            dishName: 'Vg Buffet',
            price: 600,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Buffet',
    meals: ['Lunch', 'Dinner']
},
{
    restaurantName: "JC Cafe",
    location: 'Chandigarh',
    reviews: [
        {
            review: 'Great Ambience.',
            reviewBy: 'Noori Mehta'
        },
        {
            review: 'Perfect place for Sunday bruches.',
            reviewBy: 'Malavika Jaishi'
        }
    ],
    menu: [
        {
            dishName: 'Indi Chini Sizzler',
            price: 350,
            available: true
        },
        {
            dishName: 'Pasta Alfredo',
            price: 400,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Cafe',
    meals: ['Lunch', 'Dinner']
},
{
    restaurantName: "Boston Bites",
    location: 'Chandigarh',
    reviews: [
        {
            review: 'Great Burgers',
            reviewBy: 'Manveet Kaur Rai'
        }

    ],
    menu: [
        {
            dishName: 'Chicken Burger',
            price: 300,
            available: true
        },
        {
            dishName: 'Salami Sandwitch',
            price: 200,
            available: true
        },
        {
            dishName: 'Ham Toast',
            price: 220,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Cafe',
    meals: ['Breakfast', 'Lunch', 'Dinner']
},
{
    restaurantName: "Uncle Jacks",
    location: 'Chandigarh',
    reviews: [
        {
            review: 'Amazing cocept and food',
            reviewBy: 'Vaibhav Gupta'
        }

    ],
    menu: [
        {
            dishName: 'Nutella Waffle',
            price: 250,
            available: true
        },
        {
            dishName: 'Cheesy Fries',
            price: 110,
            available: true
        },
        {
            dishName: 'Cuban Sandwitch',
            price: 220,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Pocket Friendly',
    meals: ['Lunch', 'Dinner']
},
{
    restaurantName: "SuperDonuts",
    location: 'Chandigarh',
    reviews: [
        {
            review: 'Amazing Shakes and Donuts',
            reviewBy: 'Punnet Dhiman'
        }

    ],
    menu: [
        {
            dishName: 'Red Velvet Donut',
            price: 70,
            available: true
        },
        {
            dishName: 'Thick Shake',
            price: 210,
            available: true
        },
        {
            dishName: 'Chocolate Donut',
            price: 70,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Bakery',
    meals: ['Breakfast', 'Lunch', 'Dinner']
},
{
    restaurantName: "JW Marriot",
    location: 'Chandigarh',
    reviews: [
        {
            review: 'Best 5-Star Hotel for a reason',
            reviewBy: 'Mokshit Sood'
        }

    ],
    menu: [
        {
            dishName: 'French Toast',
            price: 300,
            available: true
        },
        {
            dishName: 'Margarita Pizza',
            price: 200,
            available: true
        },
        {
            dishName: 'Mushroom Omellete',
            price: 220,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Fine Dining',
    meals: ['Breakfast', 'Lunch', 'Dinner']
},


{
    restaurantName: "Flyp",
    location: 'Chandigarh',
    reviews: [
        {
            review: 'great Italian food.',
            reviewBy: 'Mokshit Sharma'
        },

    ],
    menu: [
        {
            dishName: 'Mozarella Sticks',
            price: 160,
            available: true
        },
        {
            dishName: 'Chicken Pizza',
            price: 230,
            available: true
        },
        {
            dishName: 'Chicken Sizzler',
            price: 350,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Cafe',
    meals: ['Lunch', 'Dinner']
},

{
    restaurantName: "Mala Momos",
    location: 'Chandigarh',
    reviews: [
        {
            review: 'best nepali momos',
            reviewBy: 'Manu Singh Sodhi'
        }
    ],
    menu: [
        {
            dishName: 'Veg Momos',
            price: 50,
            available: true
        },
        {
            dishName: 'Chicken Momos',
            price: 60,
            available: true
        }

    ],
    trendCount: 1,
    priceForTwo: 250,
    category: 'Pocket Friendly',
    meals: ['Breakfast', 'Lunch', 'Dinner']
},
// {
// restaurantName: "Rai di hatti",
// location: 'Chandigarh',
// reviews: [
// {
// review: 'very good chai sutta',
// reviewBy: "Navraj Singh Kaler"
// }
// ],
// menu: [
// {
// dishName: 'Chai sutta',
// price: 25,
// available: true
// }

// ],
// trendCount: 0,
// priceForTwo: 250
// },
{
    restaurantName: "Donut House",
    location: 'Mysore',
    reviews: [
        {
            review: 'Best Donuts in town',
            reviewBy: 'Ramsay Gordan'
        }
    ],
    menu: [
        {
            dishName: 'Strawberry Donut',
            price: 70,
            available: true
        },
        {
            dishName: 'Oreo Donut',
            price: 70,
            available: true
        },
        {
            dishName: 'Caramel Donut',
            price: 70,
            available: false
        }

    ],

    trendCount: 3,
    priceForTwo: 250,
    category: 'Bakery',
    meals: ['Breakfast', 'Lunch', 'Dinner']
},
{
    restaurantName: "Burger Lounge",
    location: 'Mysore',
    reviews: [
        {
            review: 'Best Burgers ever',
            reviewBy: 'Sandeep khosla'

        }
    ],
    menu: [
        {
            dishName: 'paneer tikki burger',
            price: 150,
            available: true
        },
        {
            dishName: 'Chilli Chicken burger',
            price: 300,
            available: true
        },
        {
            dishName: 'Ham burger',
            price: 100,
            available: false
        }

    ],
    trendCount: 2,
    priceForTwo: 250,
    category: 'Pocket Friendly',
    meals: ['Breakfast', 'Lunch', 'Dinner']
},
{
    restaurantName: "Dolphin",
    location: 'Mysore',
    reviews: [
        {
            review: 'one of the best bakery in town',
            reviewBy: 'Rekesh Mahajan'
        },
        {
            review: 'All Freshly Prepared',
            reviewBy: 'Aman Gupta'
        }
    ],
    menu: [
        {
            dishName: 'Cheese Sandwitch',
            price: 80,
            available: true
        },
        {
            dishName: 'Corn Sandwitch',
            price: 80,
            available: true
        },
        {
            dishName: 'Choco Cake',
            price: 250,
            available: false
        }
    ],
    trendCount: 5,
    priceForTwo: 250,
    category: 'Bakery',
    meals: ['Breakfast', 'Lunch', 'Dinner']
}, {
    restaurantName: "Cafe Coffee Day",
    location: 'Mysore',
    reviews: [
        {
            review: 'Best White sauce pasta ever.',
            reviewBy: 'Mokshit Sood'
        },
        {
            review: 'Amazing pancakes are available here.',
            reviewBy: 'Puneet Dhiman'
        }

    ],
    menu: [
        {
            dishName: 'Americano Coffee',
            price: 220,
            available: true
        },
        {
            dishName: 'Expresso Hot Coffee',
            price: 230,
            available: true
        },
        {
            dishName: 'Chilli Paneer Tikka Pizza',
            price: 300,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Cafe',
    meals: ['Breakfast', 'Lunch', 'Dinner']
},
{
    restaurantName: "Cheezy Omlette",
    location: 'Mysore',
    reviews: [
        {
            review: 'Not worth the money.',
            reviewBy: 'Manveet Kaur Rai'
        },
        {
            review: 'Best place to chill around in town.',
            reviewBy: 'Raagu Chawla'
        }

    ],
    menu: [
        {
            dishName: 'Italiano White Alfredo Pasta',
            price: 220,
            available: true
        },
        {
            dishName: 'Choco Pancake',
            price: 230,
            available: true
        },
        {
            dishName: 'Cheezy Chicken Omlette',
            price: 280,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Pocket Friendly',
    meals: ['Breakfast', 'Lunch', 'Dinner']
},
{
    restaurantName: "Infinit",
    location: 'Mysore',
    reviews: [
        {
            review: 'great grilled burgers',
            reviewBy: 'Yash Singla'
        }
    ],
    menu: [
        {
            dishName: 'Bun faa Spicy Burger',
            price: 250,
            available: true
        },
        {
            dishName: 'Peri Peri Grilled burger',
            price: 200,
            available: true
        },
        {
            dishName: 'Paneer Tikki Grilled Burger',
            price: 300,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Fine Dining',
    meals: ['Lunch', 'Dinner']
},
{
    restaurantName: "Sha's",
    location: 'Mysore',
    reviews: [
        {
            review: 'Great ambience.',
            reviewBy: 'Malavika Jaishi'
        },
        {
            review: 'Best biryani ever.',
            reviewBy: 'Puneet Dhiman'
        }

    ],
    menu: [
        {
            dishName: 'Chicken Tandoori Biryani',
            price: 300,
            available: true
        },
        {
            dishName: 'Veg Biryani',
            price: 230,
            available: true
        },
        {
            dishName: 'Fresh Beer',
            price: 200,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Fine Dining',
    meals: ['Lunch', 'Dinner']
},
// {
//     restaurantName: "Cake Bells",
//     location: 'Mysore',
//     reviews: [
//         {
//             review: 'great place to spend tour saturday nights.',
//             reviewBy: 'Noori Mehta'
//         },
//         {
//             review: 'Food is not that good',
//             reviewBy: 'Preeti Garg'
//         }

//     ],
//     menu: [
//         {
//             dishName: 'American chilly Nachos',
//             price: 250,
//             available: true
//         },
//         {
//             dishName: 'Chinese Sizler',
//             price: 220,
//             available: true
//         },
//         {
//             dishName: 'Pasta Red Arabiata',
//             price: 280,
//             available: true
//         }
//     ],
//     trendCount: 0,
//     priceForTwo: 250,
//     category: 'Cafe',
//     meals: ['Breakfast', 'Lunch', 'Dinner']
// },
{
    restaurantName: "Cake Bell",
    location: 'Mysore',
    reviews: [
        {
            review: 'best desserts',
            reviewBy: 'Navraj Kaler'
        },
        {
            review: 'Amazing Cold Coffee',
            reviewBy: 'Navraj Kaler'
        }

    ],
    menu: [
        {
            dishName: 'Michigan Cheese Cake',
            price: 160,
            available: true
        },
        {
            dishName: 'Kitkat Oreo Cake',
            price: 800,
            available: true
        },
        {
            dishName: 'Hot Dogs',
            price: 300,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Bakery',
    meals: ['Breakfast', 'Lunch', 'Dinner']
},
{
    restaurantName: "Rasoi Delite",
    location: 'Mysore',
    reviews: [
        {
            review: 'Amazing buffets.',
            reviewBy: 'Navraj Kaler'
        }
    ],
    menu: [
        {
            dishName: 'Non-Veg special Buffet',
            price: 850,
            available: true
        },
        {
            dishName: 'Veg special Buffet',
            price: 700,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Buffet',
    meals: ['Lunch', 'Dinner']
},
{
    restaurantName: "Cubs",
    location: 'Mysore',
    reviews: [
        {
            review: 'great place to go with family',
            reviewBy: 'Noori Mehta'
        }
    ],
    menu: [
        {
            dishName: 'Buffet Non-Veg',
            price: 750,
            available: true
        },
        {
            dishName: 'Buffet Veg ',
            price: 600,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Buffet',
    meals: ['Lunch', 'Dinner']
},
{
    restaurantName: "Taco bell",
    location: 'Mysore',
    reviews: [
        {
            review: 'Great Ambience.',
            reviewBy: 'Noori Mehta'
        },
        {
            review: 'Perfect place for Sunday bruches.',
            reviewBy: 'Malavika Jaishi'
        }
    ],
    menu: [
        {
            dishName: 'Taco',
            price: 350,
            available: true
        },
        {
            dishName: 'Burrito',
            price: 400,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Fine Dining',
    meals: ['Breakfast', 'Lunch', 'Dinner']
},
// {
// restaurantName: "KFC",
// location: 'Mysore',
// reviews: [
// {
// review: 'Great Burgers',
// reviewBy: 'Manveet Kaur Rai'
// }

// ],
// menu: [
// {
// dishName: 'Chicken Burger2',
// price: 300,
// available: true
// },
// {
// dishName: 'Hot Wings',
// price: 200,
// available: true
// },
// {
// dishName: 'Chicken Wrap',
// price: 220,
// available: true
// }
// ],
// trendCount: 0,
// priceForTwo: 250
// },
{
    restaurantName: "McDonalds",
    location: 'Mysore',
    reviews: [
        {
            review: 'Amazing concept and food',
            reviewBy: 'Vaibhav Gupta'
        }

    ],
    menu: [
        {
            dishName: 'Mc Aloo Tikki',
            price: 25,
            available: true
        },
        {
            dishName: 'McPuff',
            price: 110,
            available: true
        },
        {
            dishName: 'Cuban Burger',
            price: 220,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Pocket Friendly',
    meals: ['Breakfast', 'Lunch', 'Dinner']
},
{
    restaurantName: "Metro Cool Donuts",
    location: 'Mysore',
    reviews: [
        {
            review: 'Amazing Shakes and Donuts',
            reviewBy: 'Punnet Dhiman'
        }

    ],
    menu: [
        {
            dishName: 'Red Velvvet Donut',
            price: 70,
            available: true
        },
        {
            dishName: 'Thick Shhake',
            price: 210,
            available: true
        },
        {
            dishName: 'Vanilla Donut',
            price: 70,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Pocket Friendly',
    meals: ['Breakfast', 'Lunch', 'Dinner']
},
{
    restaurantName: "Hatti Kappi",
    location: 'Mysore',
    reviews: [
        {
            review: 'Best Coffee House for a reason',
            reviewBy: 'Mokshit Sood'
        }

    ],
    menu: [
        {
            dishName: 'Frnch Toast',
            price: 300,
            available: true
        },
        {
            dishName: 'kappi',
            price: 200,
            available: true
        },
        {
            dishName: 'Cold Kappi',
            price: 220,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Cafe',
    meals: ['Lunch', 'Dinner']
},


{
    restaurantName: "MDP Coffee House",
    location: 'Mysore',
    reviews: [
        {
            review: 'great Coffee.',
            reviewBy: 'Mokshit Sharma'
        },

    ],
    menu: [
        {
            dishName: 'Hot Coffee',
            price: 160,
            available: true
        },
        {
            dishName: 'Cold Coffee',
            price: 230,
            available: true
        },
        {
            dishName: 'Filter Coffee',
            price: 150,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Cafe',
    meals: ['Lunch', 'Dinner']
},

{
    restaurantName: "Polar Bear",
    location: 'Mysore',
    reviews: [
        {
            review: 'best Ice Cream',
            reviewBy: 'Manu Singh Sodhi'
        }
    ],
    menu: [
        {
            dishName: 'Vanilla Ice-Cream',
            price: 50,
            available: true
        },
        {
            dishName: '7 wonders',
            price: 60,
            available: true
        }

    ],
    trendCount: 1,
    priceForTwo: 250,
    category: 'Ice Cream',
    meals: ['Lunch', 'Dinner']
},
{
    restaurantName: "Lassi",
    location: 'Mysore',
    reviews: [
        {
            review: 'very good Lassi',
            reviewBy: "Navraj Singh Kaler"
        }
    ],
    menu: [
        {
            dishName: 'Sweet Lassi',
            price: 25,
            available: true
        },
        {
            dishName: 'Mango Lassi',
            price: 25,
            available: true
        }

    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Pocket Friendly',
    meals: ['Dinner']
},
{
    restaurantName: "Subway",
    location: 'New Delhi',
    reviews: [
        {
            review: 'Best Sandwitch in town',
            reviewBy: 'Ramsay Gordan'
        }
    ],
    menu: [
        {
            dishName: 'veggie delight',
            price: 170,
            available: true
        },
        {
            dishName: 'Paneer Tikka Sub',
            price: 240,
            available: true
        },
        {
            dishName: 'Chicken Tikka Sub',
            price: 70,
            available: false
        }

    ],

    trendCount: 3,
    priceForTwo: 250,
    category: 'Pocket Friendly',
    meals: ['Breakfast', 'Lunch', 'Dinner']
},
{
    restaurantName: "Burger King",
    location: 'New Delhi',
    reviews: [
        {
            review: 'Best Burgers ever',
            reviewBy: 'Sandeep khosla'

        }
    ],
    menu: [
        {
            dishName: 'paneer tikkii burger',
            price: 150,
            available: true
        },
        {
            dishName: 'Chilly Chicken burger2',
            price: 300,
            available: true
        },
        {
            dishName: 'Lamb burger',
            price: 100,
            available: false
        }

    ],
    trendCount: 2,
    priceForTwo: 250,
    category: 'Pocket Friendly',
    meals: ['Breakfast', 'Lunch', 'Dinner']
},
{
    restaurantName: "The Grill Cafe",
    location: 'New Delhi',
    reviews: [
        {
            review: 'one of the best Cafes in town',
            reviewBy: 'Rekesh Mahajan'
        },
        {
            review: 'All Freshly Prepared',
            reviewBy: 'Aman Gupta'
        }
    ],
    menu: [
        {
            dishName: 'Cheesee Sandwitch',
            price: 80,
            available: true
        },
        {
            dishName: 'Corns Sandwitch',
            price: 80,
            available: true
        },
        {
            dishName: 'Chocolava Cake',
            price: 250,
            available: false
        }
    ],
    trendCount: 5,
    priceForTwo: 250,
    category: 'Cafe',
    meals: ['Lunch', 'Dinner']
}, {
    restaurantName: "Nandos",
    location: 'New Delhi',
    reviews: [
        {
            review: 'food was not at all nice.',
            reviewBy: 'Preeti Singla'
        }

    ],
    menu: [
        {
            dishName: 'Mutton Kebab',
            price: 220,
            available: true
        },
        {
            dishName: 'Lasooni Kebaab',
            price: 230,
            available: true
        },
        {
            dishName: 'Chicken Breast',
            price: 150,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Fine Dining',
    meals: ['Lunch', 'Dinner']
}, {
    restaurantName: "Warehouse Cafe",
    location: 'New Delhi',
    reviews: [
        {
            review: 'Best White sauce pasta ever.',
            reviewBy: 'Mokshit Sood'
        },
        {
            review: 'Amazing pancakes are available here.',
            reviewBy: 'Puneet Dhiman'
        }

    ],
    menu: [
        {
            dishName: 'Americano Latina Coffee',
            price: 220,
            available: true
        },
        {
            dishName: 'Expresso Hot Coffee shots',
            price: 230,
            available: true
        },
        {
            dishName: 'Chilli Paneer Pizza',
            price: 300,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Cafe',
    meals: ['Breakfast', 'Lunch', 'Dinner']
},
{
    restaurantName: "Binge",
    location: 'New Delhi',
    reviews: [
        {
            review: 'Not worth the money.',
            reviewBy: 'Manveet Kaur Rai'
        },
        {
            review: 'Best place to chill around in town.',
            reviewBy: 'Raagu Chawla'
        }

    ],
    menu: [
        {
            dishName: 'White Alfredo Pasta',
            price: 220,
            available: true
        },
        {
            dishName: 'ChocoLava Pancake',
            price: 230,
            available: true
        },
        {
            dishName: 'Cheese Chicken Omlette',
            price: 280,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Pocket Friendly',
    meals: ['Breakfast', 'Lunch', 'Dinner']
},
{
    restaurantName: "OpenHouse Cafe",
    location: 'New Delhi',
    reviews: [
        {
            review: 'great grilled burgers',
            reviewBy: 'Yash Singla'
        }
    ],
    menu: [
        {
            dishName: 'Bun faa Burger',
            price: 250,
            available: true
        },
        {
            dishName: 'Peri Peri burger',
            price: 200,
            available: true
        },
        {
            dishName: 'Veg Grilled Burger',
            price: 300,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Cafe',
    meals: ['Lunch', 'Dinner']
},
{
    restaurantName: "Pizza Hut",
    location: 'New Delhi',
    reviews: [
        {
            review: 'Great ambience.',
            reviewBy: 'Malavika Jaishi'
        },
        {
            review: 'Best Pizza ever.',
            reviewBy: 'Puneet Dhiman'
        }

    ],
    menu: [
        {
            dishName: 'Chicken Tandoori Pizza',
            price: 300,
            available: true
        },
        {
            dishName: 'Veg Extragavanza',
            price: 230,
            available: true
        },
        {
            dishName: 'Freshly brewed Beer',
            price: 200,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Fine Dining',
    meals: ['Lunch', 'Dinner']
},
{
    restaurantName: "The Sweet Jar",
    location: 'New Delhi',
    reviews: [
        {
            review: 'great place to spend tour saturday nights.',
            reviewBy: 'Noori Mehta'
        },
        {
            review: 'Food is not that good',
            reviewBy: 'Preeti Garg'
        }

    ],
    menu: [
        {
            dishName: 'rainbow cake',
            price: 250,
            available: true
        },
        {
            dishName: 'Buttercotch Cake',
            price: 220,
            available: true
        },
        {
            dishName: 'Marble Cake',
            price: 280,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Bakery',
    meals: ['Breakfast', 'Lunch', 'Dinner']
},
// {
// restaurantName: "Masabar",
// location: 'New Delhi',
// reviews: [
// {
// review: 'best desserts',
// reviewBy: 'Navraj Kaler'
// },
// {
// review: 'Amazing Cold Coffee',
// reviewBy: 'Navraj Kaler'
// }

// ],
// menu: [
// {
// dishName: 'Michigan State Cheese Cake',
// price: 160,
// available: true
// },
// {
// dishName: 'Kitkat Snicker Cake',
// price: 800,
// available: true
// },
// {
// dishName: 'Ice Tea',
// price: 300,
// available: true
// }
// ],
// trendCount: 0,
// priceForTwo: 250
// },
{
    restaurantName: "Food Exchange",
    location: 'New Delhi',
    reviews: [
        {
            review: 'Amazing buffets.',
            reviewBy: 'Navraj Kaler'
        }
    ],
    menu: [
        {
            dishName: 'Non-Veg Chinese Buffet',
            price: 850,
            available: true
        },
        {
            dishName: 'Veg Chinese Buffet',
            price: 700,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Buffet',
    meals: ['Breakfast', 'Lunch', 'Dinner']
},
{
    restaurantName: "Creo",
    location: 'New Delhi',
    reviews: [
        {
            review: 'great place to go with family',
            reviewBy: 'Noori Mehta'
        }
    ],
    menu: [
        {
            dishName: 'Buffet Chinese Non-Veg',
            price: 750,
            available: true
        },
        {
            dishName: 'Buffet Chinese Veg ',
            price: 600,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Buffet',
    meals: ['Lunch', 'Dinner']
},
{
    restaurantName: "Gallery Cafe",
    location: 'New Delhi',
    reviews: [
        {
            review: 'Great Ambience.',
            reviewBy: 'Noori Mehta'
        },
        {
            review: 'Perfect place for Sunday bruches.',
            reviewBy: 'Malavika Jaishi'
        }
    ],
    menu: [
        {
            dishName: 'Chicken Taco',
            price: 350,
            available: true
        },
        {
            dishName: 'Chicken Burrito',
            price: 400,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Cafe',
    meals: ['Lunch', 'Dinner']
},
{
    restaurantName: "Spectre",
    location: 'New Delhi',
    reviews: [
        {
            review: 'Great Burgers',
            reviewBy: 'Manveet Kaur Rai'
        }

    ],
    menu: [
        {
            dishName: 'Chicken Special Burger',
            price: 300,
            available: true
        },
        {
            dishName: 'Hot n Crispy Wings',
            price: 200,
            available: true
        },
        {
            dishName: 'Chicken Mexican Wrap',
            price: 220,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Pocket Friendly',
    meals: ['Breakfast', 'Lunch', 'Dinner']
},
{
    restaurantName: "Spring",
    location: 'New Delhi',
    reviews: [
        {
            review: 'Amazing concept and food',
            reviewBy: 'Vaibhav Gupta'
        }

    ],
    menu: [
        {
            dishName: 'Aloo Tikki Burger',
            price: 25,
            available: true
        },
        {
            dishName: 'Qasadilla',
            price: 110,
            available: true
        },
        {
            dishName: 'Fajita',
            price: 220,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Pocket Friendly',
    meals: ['Breakfast', 'Lunch', 'Dinner']
},
{
    restaurantName: "Cafe on 3",
    location: 'New Delhi',
    reviews: [
        {
            review: 'Amazing Shakes and Donuts',
            reviewBy: 'Punnet Dhiman'
        }

    ],
    menu: [
        {
            dishName: 'Red Velveet Donut',
            price: 70,
            available: true
        },
        {
            dishName: 'Thick Choco Shake',
            price: 210,
            available: true
        },
        {
            dishName: 'Vanila Donut',
            price: 70,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Cafe',
    meals: ['Lunch', 'Dinner']
},
{
    restaurantName: "Cafe G",
    location: 'New Delhi',
    reviews: [
        {
            review: 'Best Coffee House for a reason',
            reviewBy: 'Mokshit Sood'
        }

    ],
    menu: [
        {
            dishName: 'Freench Toast',
            price: 300,
            available: true
        },
        {
            dishName: 'Coffee',
            price: 200,
            available: true
        },
        {
            dishName: 'Cold Drink',
            price: 220,
            available: true
        }
    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Cafe',
    meals: ['Lunch', 'Dinner']
},


// {
// restaurantName: "Melange",
// location: 'New Delhi',
// reviews: [
// {
// review: 'great Coffee.',
// reviewBy: 'Mokshit Sharma'
// },

// ],
// menu: [
// {
// dishName: 'Hot Special Coffee',
// price: 160,
// available: true
// },
// {
// dishName: 'Cold Special Coffee',
// price: 230,
// available: true
// },
// {
// dishName: 'Freshly Brewed Coffee',
// price: 150,
// available: true
// }
// ],
// trendCount: 0,
// priceForTwo: 250
// },

{
    restaurantName: "Karim's",
    location: 'New Delhi',
    reviews: [
        {
            review: 'best Chicken',
            reviewBy: 'Manu Singh Sodhi'
        }
    ],
    menu: [
        {
            dishName: 'Chk Biryani',
            price: 150,
            available: true
        },
        {
            dishName: 'Chicken Masala Tikka',
            price: 160,
            available: true
        }

    ],
    trendCount: 1,
    priceForTwo: 250,
    category: 'Fine Dining',
    meals: ['Breakfast', 'Lunch', 'Dinner']
},
{
    restaurantName: "Mosaic",
    location: 'New Delhi',
    reviews: [
        {
            review: 'very good Food',
            reviewBy: "Navraj Singh Kaler"
        }
    ],
    menu: [
        {
            dishName: 'Sweet Lasi',
            price: 25,
            available: true
        },
        {
            dishName: 'Mango Tamarind Slush',
            price: 125,
            available: true
        }

    ],
    trendCount: 0,
    priceForTwo: 250,
    category: 'Fine Dining',
    meals: ['Lunch', 'Dinner']
}
]

exports.setupDb = () => {
    return collection.getAuthentications().then((auth) => {
        return collection.getRestaurants().then((restaurant) => {
            return collection.getLoginUsers().then((users) => {
                return users.deleteMany().then(() => {
                    return restaurant.deleteMany().then(() => {
                        return auth.deleteMany().then(() => {
                            return restaurant.insertMany(restaurantDb).then((restaurantResponse) => {
                                return auth.insertMany(authDb).then((authResponse) => {
                                    if (authResponse && restaurantResponse) return "Data inserted successfully";
                                    else {
                                        let err = new Error("Insertion failed");
                                        err.status = 400;
                                        throw err;
                                    }
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}

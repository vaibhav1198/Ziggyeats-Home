var express = require('express');
var bodyParser = require('body-parser');
var restaurant = require('./routes/restaurant');
var order = require('./routes/order');
var auth = require('./routes/auth');
var errorLogger = require('./utilities/errorLogger');
var requestLogger = require('./utilities/requestLogger');
var app = express();
const cors = require("cors")
const morgan = require('mongoose-morgan')
const PORT = process.env.PORT || 1050

app.use(cors())
app.use(bodyParser.json());
app.use(morgan({
    connectionString: 'mongodb://localhost:27017/food-delivery'
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use('/restaurant', restaurant);
app.use('/order', order);
app.use('/auth', auth);
app.use(errorLogger);
app.listen(PORT, () => {
    console.log(`Mixing it up on port ${PORT}`)
  })

var express = require('express');
var app = express();

// Requires
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var listings = require('./routes/listings.js');
var rentals = require('./routes/rentals.js');

// Static
app.use(express.static('public'));

// Body parser
app.use(bodyParser.json());

// Routing
app.use('/listings', listings);
app.use('/rentals', rentals);

var username = process.env.USER_NAME;
var password = process.env.PASSWORD;

var databaseURI = '';
// process.env.MONGODB_URI will only be defined if you are running on Heroku
if (process.env.MONGODB_URI != undefined) {
    // use the string value of the environment variable
    databaseURI = process.env.MONGODB_URI;
} else {
    // use the local database server
    databaseURI = 'mongodb://' + username + ':' + password + '@ds127564.mlab.com:27564/heroku_fqrjvtf5';
}

mongoose.connect(databaseURI);

// Mongoose connection
// var databaseUrl = 'mongodb://localhost:27017/realestate';

// mongoose.connect(databaseUrl, { useMongoClient: true });

// Optional, but nice to have
mongoose.connection.on('connected', function () {
    console.log('mongoose connected to : ', databaseUrl);
});
mongoose.connection.on('error', function (err) {
    console.log('mongoose connection error to : ', err);
});

// server listen
var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log('Running on port', port);
});
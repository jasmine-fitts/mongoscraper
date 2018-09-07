var express = require("express");
var bodyParser = require("body-parser");
// var logger = require("morgan");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");

// var axios = require("axios");
// var cheerio = require("cheerio");

//Requires all models
// var db = require("./models");

var PORT = process.env.PORT || 3000;

//Initialize Express App
var app = express();

//Set up an Express Router
var router = express.Router();

//Require our routes files pass our router object
require("./config/routes")(router);


// // Use express.static to serve the public folder as a static directory
app.use(express.static(__dirname + "/public"));

// // Use morgan logger for logging requests
// // app.use(logger("dev"));

//Connect Handlebrs to our Express App
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));

//If deployed, use the deployed database. Otherwise use the local monogheadlines database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoscraper";

//Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/mongoscraper");

mongoose.connect(db, function(error) {
    //Log any errors connecting with mongoose
    if (error) {
        console.log(error);
    }
    //Or log a success message
    else {
        console.log("mongoose connection is successful");
    }
});


app.listen(PORT, function () {
    console.log("Listening on port:" + PORT)
})


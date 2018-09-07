var express = require("express");
var bodyParser = require("body-parser");
// var logger = require("morgan");
// var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");

// var axios = require("axios");
// var cheerio = require("cheerio");

//Requires all models
// var db = require("./models");

var PORT = process.env.PORT || 3000;

//Initialize Express App
var app = express();

var router = express.Router();

app.use(express.static(__dirname + "/public"));

// // Use morgan logger for logging requests
// // app.use(logger("dev"));

//Connect Handlebrs to our Express App
app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// // Use express.static to serve the public folder as a static directory
// app.use(express.static("public"));

// //Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/mongoscraper");


app.listen(PORT, function () {
    console.log("Listening on port:" + PORT)
})


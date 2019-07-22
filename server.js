var express = require("express");
var expressHandlebars = require("express-handlebars");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

var router = express.Router();

// Parse request body as JSON
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// Make public a static folder
app.use(express.static("public"));
app.use(router);

app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

mongoose.connect("mongodb://localhost/iscrape", { useNewUrlParser: true });

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });


//Routes
router.get("/", function(req,res) {
    res.render("index");
});

router.get("/saved", function(req,res) {
    res.render("saved");
});
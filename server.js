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
app.use(express.urlencoded({ extended: true }));//Was hidden
app.use(express.json());//Was hidden

// Make public a static folder
app.use(express.static("public"));
app.use(router);

app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

mongoose.connect("mongodb://localhost/mongoHeadlines", { useNewUrlParser: true });

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });


//Routes
var scrape = require("./scrape_code/scrape");

var headlinesController = require("./controllers/headlines");
var notesController = require("./controllers/notes");


router.get("/", function(req,res) {
    res.render("index");
});

router.get("/saved", function(req,res) {
    res.render("saved");
});

router.get("/api/fetch", function (req, res) {
    headlinesController.fetch(function (err, docs) {
    if (!docs || docs.insertedCount === 0) {
        res.json({
            message: "No new articles today!"
        });
    } else {
        res.json({
            message: "Added " + docs.insertedCount + " new articles!"
        });
    }
  });
});

router.get("/api/headlines", function(req, res) {
    var query = {};
    if (req.query.saved) {
        query = req.query;
    }
    headlinesController.get(query, function(data){
        res.json(data);
    });
});

router.delete("/api/headlines/:id", function(req, res) {
    var query = {};
    query._id = req.params.id;
    headlinesController.delete(query, function(err, data) {
        res.json(data);
    });
});

router.patch("/api/headlines", function(req, res) {
    headlinesController.update(req.body, function(err, data){
        res.json(data);
    });
});

router.get("/api/notes/:headline_id", function(req, res) {
    var query = {};
    if(req.params.headline_id) {
        query._id = req.params.headline_id;
    }
    notesController.get(query, function (err, data) {
        res.json(data);
      });
});

router.delete("/api/notes/:id", function(req, res){
    var query = {};
    query._id = req.params.id;
    notesController.delete(query, function(err, data){
        res.json(data);
    });
});

router.post("/api/notes", function(req, res){
    notesController.save(req.body, function(data){
        res.json(data);
    });
});
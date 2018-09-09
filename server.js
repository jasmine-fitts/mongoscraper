var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var expressHandlebars = require("express-handlebars");
// var logger = require("morgan");


//Scrapping tools
//Axios, a promise-based library http library
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();

// app.use(logger("dev"));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");


var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI);

mongoose.connect(db, function(error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log("mongoose connection is successful");
    }
});

app.get("/", function(req, res) {
    res.render("index");
})

app.get("/news-scrape", function(req, res) {
    //Grab the body of the html with request
    axios.get("https://www.npr.org/sections/news").then(function(response) {
        var $ = cheerio.load(response.data);

        $("h3.title").each(function(i, element) {
            var result = {};

            result.title = $(this)
            .children("a")
            .text();
            result.summary = $(this)
            .children("p.teaser")
            .text();
            result.link = $(this)
            .children("h2")
            .children("a")
            .attr("href");

            // Create a new Article using the  `result` object built from scraping
            db.Article.create(result)
            .then(function(dbArticle) {
                //View the added result in the console
                console.log(dbArticle);
            })
            .catch(function(err) {
                //If an error occurs, send it to the client
                return res.json(err);
            });
        });
        res.send("Scrape Complete");
    });
});

app.get("/arts-scrape", function(req, res) {
    axios.get("https://www.npr.org/sections/arts").then(function(response) {
        var $ = cheerio.load(response.data);

        $("h3.title").each(function(i, element) {
            var result = {};

            result.title = $(this)
            .children("a")
            .text();
            result.summary = $(this)
            .children("p.teaser")
            .text();
            result.link = $(this)
            .children("h2")
            .children("a")
            .attr("href");

            db.Article.create(result)
            .then(function(dbArticle) {
                console.log(dbArticle);
            })
            .catch(function(err) {
                return res.json(err);
            });
        });
        res.send("Scrape Complete");
    });
});

app.get("/music-scrape", function(req, res) {
    axios.get("https://www.npr.org/music").then(function(response) {
        var $ = cheerio.load(response.data);

        $("h3.title").each(function(i, element) {
            var result = {};

            result.title = $(this)
            .children("a")
            .text();
            result.summary = $(this)
            .children("p.teaser")
            .text();
            result.link = $(this)
            .children("h2")
            .children("a")
            .attr("href");

            db.Article.create(result)
            .then(function(dbArticle) {
                console.log(dbArticle);
            })
            .catch(function(err) {
                return res.json(err);
            });
        });
        res.send("Scrape Complete");
    });
});

app.get("/race-scrape", function(req, res) {
    axios.get("https://www.npr.org/sections/codeswitch/").then(function(response) {
        var $ = cheerio.load(response.data);

        $("h3.title").each(function(i, element) {
            var result = {};

            result.title = $(this)
            .children("a")
            .text();
            result.summary = $(this)
            .children("p.teaser")
            .text();
            result.link = $(this)
            .children("h2")
            .children("a")
            .attr("href");
  
            db.Article.create(result)
            .then(function(dbArticle) {
                console.log(dbArticle);
            })
            .catch(function(err) {
                return res.json(err);
            });
        });
        res.send("Scrape Complete");
    });
});

app.get("/articles", function(req, res) {
    db.Article.find({})
    .then(function(dbArticle) {
        res.json(dbArticle);
    })
    .catch(function(err) {
        res.json(err);
    });
});

app.get("/articles/:id", function(req, res) {
  db.Article.findOne({ _id: req.params.id })
    .populate("note")
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.post("/articles/:id", function(req, res) {
  db.Note.create(req.body)
    .then(function(dbNote) {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.delete("/articles/:id", function(req, res) {
  db.Note.findOneAndRemove({ _id: req.params.id })
    .then(function(dbNote) {
      res.json(dbNote);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
});
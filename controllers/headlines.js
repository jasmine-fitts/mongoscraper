//Bring in the scrape and makeDate scripts
var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");

//Bring in the Headline and Note mongoose models
var Headline = require("../models/Headline");

module.exports = {
    //fecth runs the scrape function and grabs all of the articles and enters them in the headline collection of the mongo database
    fetch: function(cb) {
        scrape(function(data) {
            var articles = data;
            for (var i=0; i < articles.length; i++) {
                articles[i].date = makeDate();
                articles[i].saved = false;
            }

            Headline.collection.insertMany(articles, {ordered:false}, function(err, docs) {
                cb(err, docs);
            });
        });
    }, 
    delete: function(query, cb) {
        Headline.remove(query, cb);
    },
    get: function(query, cb) {
        Headline.find(query)
        .sort({
            _id: -1
        })
        .exec(function(err, doc) {
            cb(doc);
        });
    },
    update: function(query, cb) {
        Headline.update({_id: query.id}, {
            $set: query
        }, {}, cb);
    }
}
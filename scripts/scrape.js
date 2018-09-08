var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {
    request("https://www.cnn.com/", function(err, res, body) {
        

        var $ = cheerio.load(body);

        var articles = [];

        $(".theme-summary").each(function(i, element) {
             
            var head = $(this).children(".stroy-heading").text().trim();
            var sum = $(this).children(".summary").text().trim();

            var sumNeat = sum.replace()

            if (head && sum) {
                var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var dataToAdd = {
                    headline: headNeat,
                    summary: sumNeat
                };

                articles.push(dataToAdd);
            }    
        });

        //Sends articles from the array
        cb(articles);
    });
};

module.exports = scrape;
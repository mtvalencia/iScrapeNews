var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {
    request("https://www.sfchronicle.com/vault/fromthearchive/", function (err, res, body) {
        var $ = cheerio.load(body);
        var articles = [];
        $(".sub_topstories_item").each(function(i, element) {
            var head = $(this).children(".headline").text().trim();
            var author = $(this).children(".byline").text().trim();
            var summary = $(this).children(".blurb").text().trim();
            var url = $(this).children("a").attr("href").trim();
            
            if(head && author && summary){
                var headClean = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var authorClean = author.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var summaryClean = summary.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
            }

            var content = {
                headline: headClean,
                author: authorClean,
                summary: summaryClean,
                url: "https://www.sfchronicle.com" + url

            };
            articles.push(content);
            console.log(content);
        });
        cb(articles);
      });
  };

  module.exports = scrape;
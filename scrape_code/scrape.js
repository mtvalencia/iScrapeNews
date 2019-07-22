var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {
    request("https://www.sfchronicle.com/vault/fromthearchive/", function (err, res, body) {
        var $ = cheerio.load(body);
        var articles = [];
        $(".sub_topstories_item ").each(function(i, element) {
            var head = $(this).children(".headline").text().trim();
            var summary = $(this).children(".blurb").text().trim();
            var url = $(this).children(".without_u").text().trim();
            // var photo = $(this).children(".blurb").text().trim(); //Later
            
            var content = {
                headline: head,
                summary: summary,
                url: url
            };
            articles.push(content);
        });
        cd(articles);
      });
  };

  module.exports = scrape;
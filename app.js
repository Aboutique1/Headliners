var path = require('path');
var express = require("express");
var exphbs = require("express-handlebars");
var axios = require("axios");
var cheerio = require("cheerio");

var app = express();
app.engine('handlebars', exphbs());

app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function (req, res) {
  const scrapedArticles = [];
  axios.get('https://www.vogue.com/')
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      const newsFeeds = $('div.site-container > div#main > div.infinite-scroll > div:nth-child(1) > div > div:nth-child(3) > div > div > div');
      newsFeeds.children().each((index, element) => {
        const imageElement = $(element).find('div.feed-card--wrapper > article > div > div.feed-card--image');
        const anchorElement = $(element).find('div.feed-card--wrapper > article > div');
        const articleHeader = $(anchorElement).find('h2');
        const imageAnchor = $(imageElement).find('a');
        const articleLink = $(articleHeader).find('a').attr('href');
        const articleTitle = $(articleHeader).find('a').text();
        const image = $(imageAnchor).find('img').attr('srcset');
        const imageAlt = $(imageAnchor).find('img').attr('alt');

        const article = {
          articleTitle,
          image,
          imageAlt,
          link: articleLink,
        };
        scrapedArticles.push(article);
      });
      res.render('home', {
        data: scrapedArticles,
        title: "Headliners",
      })
    })
});

const PORT = process.env.PORT || 3006;

app.listen(PORT, function () {
  console.log("Merry Christmas");
});
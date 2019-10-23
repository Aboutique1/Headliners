var express = require("express");
var exphbs = require("express-handlebars");
var axios = require("axios");
var cheerio = require("cheerio");


var app = express();
app.engine('handlebars',exphbs());

app.set('view engine','handlebars');

app.get('/',function(req,res){
  let datas=[];
  axios.get('https://news.ycombinator.com/')
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);
        
        $("table.itemlist tr td:nth-child(3)").each((i,elem) => {
          // open javascript console and look for "elements". picked out elements I need to scrape with
          // cheerio which works like jquery
          const title = $(elem).text();
          const link = $(elem).find("a.storylink").attr("href");

          // bundle data and link into a data object
          let data = {
            title,
            link
          }
          // push to our collection datas, the array on line 20
          datas.push(data);
      });

      
      
          
        console.log(datas);
      
        })  
    
    res.render('home',{title:"Headliners"})

});

app.listen(3006,function(){
    console.log("Merry Christmas");
});


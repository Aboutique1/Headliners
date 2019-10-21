var express = require("express");
var exphbs = require("express-handlebars");
var axios = require("axios");
var cheerio = require("cheerio");


var app = express();
app.engine('handlebars',exphbs());

app.set('view engine','handlebars');

app.get('/',function(req,res){
  let datas=[];
  axios.get('https://news.ycombinator.com')
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(hmtl);

        console.log(response.data)
      })  
    
    res.render('home',{title:"Headliners"})

});

app.listen(3006,function(){
    console.log("I'm sleepy and hungry");
});


var express = require("express");
var exphbs = require("express-handlebars");
var axios = require("axios");
var cheerio = require("cheerio");


var app = express();
app.engine('handlebars',exphbs());

app.set('view engine','handlebars');

app.get('/',function(req,res){
  axios.get('https://www.nastygal.com')
      .then((response) => {

        console.log(response)
      })  
    
    res.render('home',{title:"Headliners"})

});

app.listen(3005,function(){
    console.log("I'm sleepy and hungry");
});


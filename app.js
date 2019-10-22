var express = require("express");
var exphbs = require("express-handlebars");
var axios = require("axios");
var cheerio = require("cheerio");


var app = express();
app.engine('handlebars',exphbs());

app.set('view engine','handlebars');

app.get('/',function(req,res){
  let datas=[];
  axios.get('https://www.nytimes.com/section/us')
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(hmtl);
        $('#latest-panel article.story.theme-summary').each((i, element) => { 

          var storyURL =$(element).find('.story-body>.story-link').attr('href)');
          
          var summary =$(element).find('summary').text().trim();

          var headline =$(element).find('h2.headline').text().trim();

          var data = {storyURL,summary,headline};

          datas.push(data)

      });
          
        console.log(datas);
      
        })  
    
    res.render('home',{title:"Headliners"})

});

app.listen(3006,function(){
    console.log("I'm sleepy and hungry");
});


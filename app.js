var express = require("express");
var exphbs = require("express-handlebars");
var app = express();
app.engine('handlebars',exphbs());

app.set('view engine','handlebars');

app.get('/',function(req,res){
    
    res.render('home',{title:"AmWebb"})

});

app.listen(3005,function(){
    console.log("I'm sleepy and hungry");
});
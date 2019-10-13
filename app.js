var express = require("express");
var expressHandlebars = require("express-handlebars");
var app = express();
app.engine('handlebars',exphbs());

app.set('view engine','handlebars');

app.get('/',function(req,res){res.sender('home')});

app.listen(3000);
var express = require('express');
var app = express();
var hbs = require('hbs');

app.use(express.static('bower_components/'));
app.use(express.static('public/'));

app.set('view engine','html');
app.engine('html', hbs.__express);

app.get("/",function(req,res){
  //res.sendFile(__dirname + "/views/index.html");
  res.render('index',{scoreList:[{"name":"杨林","chinese":"52","math":"98"},
  {"name":"喜洋洋","chinese":85,"math":26},
  {"name":"奥巴马","chinese":89,"math":56},
  {"name":"盖茨","chinese":87,"math":40}]});
});

app.listen(3000);
console.log("Listening on port 3000:http://localhost:3000");

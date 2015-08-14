var express = require('express');
var hbs = require('hbs');
var fs = require('fs');
var sort = require('./sort-score.js');
var score = require('./scorelist');
var app = express();

var socreList = score.getscores();

app.use(express.static('bower_components/'));
app.use(express.static('public/'));

app.set('view engine', 'html');
app.engine('html', hbs.__express);

app.get("/", function(req, res) {
  res.render('index', {
    scoreList: socreList
  });
});

app.get("/score", function(req, res) {
  var sortKey = req.query.sortKey;
  var sortOrder = req.query.sortOrder;
  var sortedList = sort(socreList, sortKey, sortOrder);
  res.send(sortedList);
  // fs.readFile(__dirname + "/scorelist.js", {
  //   encoding: 'utf-8',
  //   flag: 'r'
  // }, function(err, data) {
  //   if (err) {
  //     throw err;
  //   }
  //
  //   res.send(data);
  // });
});

app.listen(3000);
console.log("Listening on port 3000:http://localhost:3000");

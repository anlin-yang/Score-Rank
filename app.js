var express = require('express');
var hbs = require('hbs');
var fs = require('fs');
var sortScore = require('./sort-score.js');
var app = express();


app.use(express.static('bower_components/'));
app.use(express.static('public/'));

app.set('view engine', 'html');
app.engine('html', hbs.__express);

app.get("/", function(req, res) {
  fs.readFile(__dirname + "/scorelist.json", {
    encoding: 'utf-8',
    flag: 'r'
  }, function(err, data) {
    if (err) throw err;
    var scoreList = JSON.parse(data);
    res.render('index', {
      scoreList: scoreList
    });
  });
});

app.get("/score", function(req, res) {
  var sortKey = req.query.sortKey;
  var sortOrder = req.query.sortOrder;

  fs.readFile(__dirname + "/scorelist.json", {
    encoding: 'utf-8',
    flag: 'r'
  }, function(err, data) {
    if (err) throw err;
    var scoreList = JSON.parse(data);
    var sortedList = sortScore(scoreList, sortKey, sortOrder);
    res.send(sortedList);
  });
});

app.listen(3000);
console.log("Listening on port 3000:http://localhost:3000");

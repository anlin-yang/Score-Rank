var express = require('express');
var hbs = require('hbs');
var fs = require('fs');
var sortScore = require('./sort-score.js');
var mysql = require("mysql");
var app = express();

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yy',
  database: 'SCORE_RANK_DB'
});
app.use(express.static('bower_components/'));
app.use(express.static('public/'));

app.set('view engine', 'html');
app.engine('html', hbs.__express);



app.get("/abc", function(req, res) {
  var sqlStr = "select a.score_list_id,b.name,c.subject_name,a.score " +
    "from score_list a,student_info b,subject c " +
    "where a.student_id = b.student_info_id and a.subject_id = c.subject_id;";
  connection.connect();
  connection.query(sqlStr, function(err, rows, fields) {
    if (err) throw err;

    console.log(rows);
  });

  connection.end();
});


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

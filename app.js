var express = require('express');
var hbs = require('hbs');
var mysql = require("mysql");
var ScoreOperate = require('./node/score-operate.js');

var app = express();
var connection;
var theScoreOperate = new ScoreOperate();

app.use(express.static('bower_components/'));
app.use(express.static('public/'));
app.set('view engine', 'html');
app.engine('html', hbs.__express);

app.get('*', function(req, res, next) {
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yy',
    database: 'SCORE_RANK_DB'
  });
  connection.connect(function(err) {
    if (err) {
      throw err;
    } else {
      next();
    }
  });
});

app.get("/", function(req, res) {
  var sqlStr = "select a.score_list_id,b.name,c.subject_name,a.score " +
    "from score_list a,student_info b,subject c " +
    "where a.student_id = b.student_info_id and a.subject_id = c.subject_id;";
  connection.query(sqlStr, function(err, rows, fields) {
    if (err) throw err;
    var groupedScoreList = theScoreOperate.groupScore(rows);
    res.render('index', {
      scoreList: groupedScoreList
    });
    connection.end();
  });
});

app.get("/delete", function(req, res) {
  res.render('index', {
    scoreList: groupedScoreList
  });
});

app.get("/scoreSort", function(req, res) {
  var sortKey = req.query.sortKey;
  var sortOrder = req.query.sortOrder;
  var sqlStr = "select a.score_list_id,b.name,c.subject_name,a.score " +
    "from score_list a,student_info b,subject c " +
    "where a.student_id = b.student_info_id and a.subject_id = c.subject_id;";
  connection.query(sqlStr, function(err, rows, fields) {
    if (err) throw err;
    var groupedScoreList = theScoreOperate.groupScore(rows);
    var sortedScoreList = theScoreOperate.sortScore(groupedScoreList, sortKey, sortOrder);
    res.send(sortedScoreList);
    connection.end();
  });
});

app.listen(3000);
console.log("Listening on port 3000:http://localhost:3000");

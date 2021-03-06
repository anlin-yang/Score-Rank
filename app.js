var express = require('express');
var hbs = require('hbs');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var ScoreOperate = require('./node/score-operate.js');

var app = express();
var connection;
var theScoreOperate = new ScoreOperate();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('bower_components/'));
app.use(express.static('public/'));
app.set('view engine', 'html');
app.engine('html', hbs.__express);

app.all('*', function(req, res, next) {
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
  var sqlStr = "select a.student_id,b.name,c.subject_name,a.score " +
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

app.delete("/delUserScore", function(req, res, fields) {
  var delResult = {};
  var delInfo = req.body;
  var sqlStr = "delete from score_list where student_id=" + delInfo.delNameId + ";";
  connection.query(sqlStr, function(err, rows) {
    if (err) throw err;
    if (rows.affectedRows > 0) {
      delResult = {
        status: 200,
        message: "success",
        data: ""
      };
    } else {
      delResult = {
        status: 404,
        message: "delete failed",
        data: ""
      };
    }
    res.send(delResult);
    connection.end();
  });
});

app.post("/insStuScore", function(req, res) {
  var insResult = {};
  var stuInfo = req.body;
  var sqlInsStu = "insert into student_info(name) values(\'" + stuInfo.name + "\');";
  connection.query(sqlInsStu, function(err, rows) {
    if (err) throw err;
    var stuInfoId = rows.insertId;
    var sqlInsScoList = "insert into score_list values " + "(\'\'," + stuInfoId + ",1," + stuInfo.chinese + ")," + "(\'\'," + stuInfoId + ",2," + stuInfo.math + ")," + "(\'\'," + stuInfoId + ",3," + stuInfo.english + ");";
    connection.query(sqlInsScoList, function(err, rows) {
      if (err) throw err;
      if (rows.affectedRows > 0) {
        insResult = {
          status: 200,
          message: "success",
          data: ""
        };
      } else {
        insResult = {
          status: 404,
          message: "insert failed",
          data: ""
        };
      }
      res.send(insResult);
      connection.end();
    });
  });
});

app.get("/scoreSort", function(req, res) {
  var sortKey = req.query.sortKey;
  var sortOrder = req.query.sortOrder;
  var sqlStr = "select a.student_id,b.name,c.subject_name,a.score " +
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

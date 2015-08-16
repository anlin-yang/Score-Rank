function ScoreOperate() {

}
ScoreOperate.prototype.groupScore = function(scoreArr) {
  var scoreList = [];
  scoreArr.forEach(function(val) {
    for (var i = 0; i < scoreList.length; i++) {
      if (scoreList[i].name === val.name) {
        scoreList[i][val.subject_name] = val.score;
        return;
      }
    }
    var tempObject = {};
    tempObject.name = val.name;
    tempObject[val.subject_name] = val.score;
    scoreList.push(tempObject);
  });
  return scoreList;
};

module.exports = ScoreOperate;

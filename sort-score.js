function sortScore(scoreList, subject, order) {
  var sortedList = scoreList.sort(function(a, b) {
    return (parseInt(b[subject]) - parseInt(a[subject])) * parseInt(order);
  });
  return sortedList;
}
module.exports = sortScore;

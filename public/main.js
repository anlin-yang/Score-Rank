$(function() {
  var scoreList = getScoreList();

  $("#table-stripe thead").on("click", "th", function() {
    if ($(this).data('name')) {
      var sortedList = sortScore($(this).data('name'));
      if ($(this).data('positiveSeq') === 'Flase') {
        sortedList.reverse();
        $(this).data('positiveSeq', 'True');
      } else {
        $(this).data('positiveSeq', 'Flase');
      }
      $("#table-stripe tbody").empty();
      sortedList.forEach(function(val) {
        $("#table-stripe tbody").append("<tr>" +
          "<td>" + val.name + "</td>" +
          "<td>" + val.chinese + "</td>" +
          "<td>" + val.math + "</td></tr>");
      });
    }
  });

  function getScoreList() {
    var scoreList = [];
    $(".table-stripe tbody tr").each(function(i) {
      var tdList = $("td", this);
      scoreList.push({
        "name": tdList.eq(0).text().trim(),
        "chinese": tdList.eq(1).text().trim(),
        "math": tdList.eq(2).text().trim()
      });
    });
    return scoreList;
  }

  function sortScore(subject) {
    var sortedList = scoreList.sort(function(a, b) {
      return parseInt(b[subject]) - parseInt(a[subject]);
    });
    return sortedList;
  }
});

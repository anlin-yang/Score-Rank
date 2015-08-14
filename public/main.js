$(function() {
  var scoreList = getScoreList();

  $("#table-stripe thead").on("click", "th", function() {
    if ($(this).data('name')) {
      // var sortedList = sortScore($(this).data('name'));
      // if ($(this).data('positiveSeq') === 'Flase') {
      //   sortedList.reverse();
      //   $(this).data('positiveSeq', 'True');
      // } else {
      //   $(this).data('positiveSeq', 'Flase');
      // }
      var sortedList = [];
      var sortKeyValue = $(this).data('name');
      var sortOrderValue = $(this).data('order');
      var sortInfo = {
        sortKey: sortKeyValue,
        sortOrder: sortOrderValue
      };
      if ($(this).data('order') === '-1') {
        $(this).data('order', '1');
      } else {
        $(this).data('order', '-1');
      }
      $.get("/score", sortInfo, function(score) {
        console.log(score);
        sortedList = score;
        $("#table-stripe tbody").empty();
        sortedList.forEach(function(val) {
          $("#table-stripe tbody").append("<tr>" +
            "<td>" + val.name + "</td>" +
            "<td>" + val.chinese + "</td>" +
            "<td>" + val.math + "</td></tr>");
        });
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
});

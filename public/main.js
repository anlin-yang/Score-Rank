$(function() {

  $("#table-stripe thead").on("click", "th", function() {
    if ($(this).data('name')) {
      var sortInfo = {
        sortKey: $(this).data('name'),
        sortOrder: $(this).data('order')
      };

      $.get("/scoreSort", sortInfo, function(sortedList) {
        $("#table-stripe tbody").empty();
        sortedList.forEach(function(val) {
          $("#table-stripe tbody").append("<tr>" +
            "<td>" + val.name + "</td>" +
            "<td>" + val.chinese + "</td>" +
            "<td>" + val.math + "</td>" +
            "<td>" + val.english + "</td></tr>");
        });
      });

      var order = $(this).data('order') === '-1' ? '1' : '-1';
      $(this).data('order', order);
    }
  });
});

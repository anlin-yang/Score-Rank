$(function() {

  $("#table-stripe thead").on("click", "th", function() {
    if ($(this).data('name')) {
      var sortInfo = {
        sortKey: $(this).data('name'),
        sortOrder: $(this).data('order')
      };
      $.get("/scoreSort", sortInfo, function(sortedList) {
        console.log(sortedList);
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

  $("#table-stripe tbody").on("click", ".del", function() {
    var delScoreTr = $(this).parent().parent().children();
    var delNameId = delScoreTr.eq(0).data("id");
    var delName = delScoreTr.eq(0).text().trim();
    alert("Are you sure that you want to delete the user named " + delName);
    $(this).parent().parent().remove();
    $.ajax({
      url: '/delUserScore',
      data: {
        delNameId: delNameId
      },
      type: 'DELETE',
      success: function(sortedList) {
        console.log(sortedList);
        switch (sortedList.status) {
          case 200:
            var delChinese = delScoreTr.eq(1).text().trim();
            var delMath = delScoreTr.eq(2).text().trim();
            var delEnglish = delScoreTr.eq(3).text().trim();
            alert("Delete the success：姓名:" + delName + "语文:" + delChinese + "数学:" + delMath + "英语:" + delEnglish);
            $(this).parent().parent().remove();
            break;
          case 404:
            alert("You delete the data does not exist");
            break;
          default:
            alert(sortedList.message);
        }
      }
    });
  });








});

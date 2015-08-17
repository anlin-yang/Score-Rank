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
            "<td data-id=" + val.studentId + ">" + val.name + "</td>" +
            "<td>" + val.chinese + "</td>" +
            "<td>" + val.math + "</td>" +
            "<td>" + val.english + "</td>" +
            "<td>" + "<input type=\"button\" class=\"del\" value=\"delete\">" + "</td>" +
            "</tr>");
        });
        $("#table-stripe tbody").append("<tr> " +
          "<td> <input type = \"text\"> </td> " +
          "<td> <input type = \"text\"> </td> " +
          "<td> <input type = \"text\"> </td> " +
          "<td> <input type = \"text\"> </td> " +
          "<td> <input type = \"button\" id=\"insStu\" value=\"insert\"> </td> " +
          "</tr>");
      });
      var order = $(this).data('order') === '-1' ? '1' : '-1';
      $(this).data('order', order);
    }
  });

  $("#table-stripe tbody").on("click", "#insStu", function() {
    var insScoreTr = $(this).parent().parent().children();
    var insName = insScoreTr.eq(0).children().val();
    var insChinese = insScoreTr.eq(1).children().val();
    var insMath = insScoreTr.eq(2).children().val();
    var insEnglish = insScoreTr.eq(3).children().val();
    var insObj = {
      name: insName,
      chinese: insChinese,
      math: insMath,
      english: insEnglish
    };
    var insElem = $("#insStu").parent().parent();
    $.ajax({
      url: '/insStuScore',
      data: insObj,
      type: 'POST',
      success: function(resInfo) {
        switch (resInfo.status) {
          case 200:
            insElem.before("<tr><td>" + insName + "</td><td>" + insChinese + "</td><td>" + insMath + "</td><td>" + insEnglish + "</td><td><input type=\"button\" id=\"del\" value=\"delete\"></td></tr>");
            break;
          case 404:
            alert("The insert failed!!!");
            break;
          default:
            alert(resInfo.message);
        }
      }
    });
  });

  $("#table-stripe tbody").on("click", ".del", function() {
    var delScoreTr = $(this).parent().parent().children();
    var delNameId = delScoreTr.eq(0).data("id");
    var delName = delScoreTr.eq(0).text().trim();
    alert("Are you sure that you want to delete the user named " + delName);
    var rmElem = $(this).parent().parent();
    $.ajax({
      url: '/delUserScore',
      data: {
        delNameId: delNameId
      },
      type: 'DELETE',
      success: function(resInfo) {
        switch (resInfo.status) {
          case 200:
            var delChinese = delScoreTr.eq(1).text().trim();
            var delMath = delScoreTr.eq(2).text().trim();
            var delEnglish = delScoreTr.eq(3).text().trim();
            alert("Delete the success： 姓名:" + delName + ", 语文:" + delChinese + ", 数学:" + delMath + ", 英语:" + delEnglish);
            rmElem.remove();
            break;
          case 404:
            alert("You delete the data does not exist");
            break;
          default:
            alert(resInfo.message);
        }
      }
    });
  });


});

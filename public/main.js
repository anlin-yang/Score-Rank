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
            "<td>" + val.chinese + "</td>" + "<td>" + val.math + "</td>" + "<td>" + val.english + "</td>" +
            "<td> <input type=\"button\" class=\"del\" value=\"delete\"> </td> </tr>");
        });
        $("#table-stripe tbody").append("<tr> " +
          "<td> <input type = \"text\"> </td> <td> <input type = \"text\"> </td> " +
          "<td> <input type = \"text\"> </td> <td> <input type = \"text\"> </td> " +
          "<td> <input type = \"button\" id=\"insStu\" value=\"insert\"> </td> </tr>");
      });
      var order = $(this).data('order') === '-1' ? '1' : '-1';
      $(this).data('order', order);
    }
  });

  $("#table-stripe tbody").on("click", "#insStu", function() {
    var insScoreTr = $(this).closest("tr");
    var insName = insScoreTr.find('input').eq(0).val();
    var insChinese = insScoreTr.find('input').eq(1).val();
    var insMath = insScoreTr.find('input').eq(2).val();
    var insEnglish = insScoreTr.find('input').eq(3).val();
    var insObj = {
      name: insName,
      chinese: insChinese,
      math: insMath,
      english: insEnglish
    };
    var insElem = $("#insStu").closest("tr");
    $.ajax({
      url: '/insStuScore',
      data: insObj,
      type: 'POST',
      success: function(resInfo) {
        switch (resInfo.status) {
          case 200:
            insElem.before("<tr><td>" + insName + "</td><td>" + insChinese + "</td><td>" + insMath + "</td><td>" + insEnglish + "</td><td><input type=\"button\" id=\"del\" value=\"delete\"></td></tr>");
            insScoreTr.find('input').eq(0).val();
            insScoreTr.find('input').eq(1).val();
            insScoreTr.find('input').eq(2).val();
            insScoreTr.find('input').eq(3).val();
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
    var delScoreTr = $(this).closest('tr').children();
    var delNameId = delScoreTr.eq(0).data("id");
    var delName = delScoreTr.eq(0).text().trim();
    alert("Are you sure that you want to delete the user named : " + delName);
    var rmElem = $(this).closest("tr");
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



  $('#newPostIt').on("click", function (e, id) {
    e.preventDefault();
    data = 
    '<div class="card text-bg-primary mb-3 ui-widget-content postIt" id="postIt_' + id + '" style="max-width: 18rem; max-height: 10rem;">' +
      '<div class="card-header">' +
        '<div class="row">' +
          '<div class="col">' +
            toDay() +
          '</div>' +
          '<div class="col text-end">' +
            '<i class="bi bi-arrow-down-square-fill"></i>' +
            '<i class="bi bi-x-square-fill"></i>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="card-body" id="body_PostIt">' +
        '<input type=text class="postItTitle" placeholder="Task Title">' +
        '<textarea type=text rows="2" cols="40" placeholder="Task details" style="max-width: 16rem;">' +
        '</textarea>' +
      '</div>' +
    '</div>';
    
    
    
    newPostIt = $(data).data("id", id, "drop", "1");
    id++;
      
    $('#postItCreator').append(newPostIt.draggable());

    // Hide body PostIt
    $('.bi-arrow-down-square-fill').on("click", function (e) {

      console.log($(this).childrenUntil("#body_PostIt"));

      

    })





    // Delete PostIt
    $('.bi-x-square-fill').on("click", function (e) {

      let postIt = $(this).parentsUntil("#postItCreator");

      $("#dialog-confirm").dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
          "Delete the task": function () {
            postIt.remove();
            $(this).dialog("close");
          },
          Cancel: function () {
            $(this).dialog("close");
          }
        }
      });
    });




  })




$(function () {

  // $('#newPostIt').addPostIt(1);


});


function toDay() {

  var d = new Date();

  var month = d.getMonth() + 1;
  var day = d.getDate();

  var output = 
  
  (day < 10 ? '0' : '') + day + '/' +
  (month < 10 ? '0' : '') + month + '/' +
  d.getFullYear();

  return output;



}




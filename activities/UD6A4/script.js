jQuery.fn.addPostIt = function (id) {
  postIt = $(this);
  postIt.data("id", id);

  postIt.on("click", function (e) {
    e.preventDefault();
    postIt = $(this);
    id = postIt.data("id");
    data = '<div class="card text-bg-primary mb-3 ui-widget-content postIt" id="' + id + '">' +
      '<div class="card-header">' + toDay() + '</div>' +
      '<div class="card-body">' +
      '<input type=text class="postItTitle" placeholder="Task Title">' +
      '<textarea type=text rows="4" cols="40" placeholder="Task details">' +
      '' +
      '</textarea>' +
      '</div>' +
      '</div>';
    id++;
    postIt.data("id", id);
    newPostIt = $(data);
    $('#postItCreator').prepend(newPostIt.draggable());

  })


  return this;

}


$(function () {

  $('#newPostIt').addPostIt(1);


});


function toDay() {

  var d = new Date();

  var month = d.getMonth() + 1;
  var day = d.getDate();

  var output = d.getFullYear() + '/' +
    (month < 10 ? '0' : '') + month + '/' +
    (day < 10 ? '0' : '') + day;

  return output;



}


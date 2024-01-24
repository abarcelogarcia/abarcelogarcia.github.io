jQuery.fn.addPostIt = function (id) {
  postIt = $(this);
  postIt.data("id", id);

  postIt.on("click", function (e) {
    e.preventDefault();
    postIt = $(this);
    id = postIt.data("id");
    data = '<div class="card text-bg-primary mb-3 ui-widget-content postIt" id="' + id + '" style="max-width: 18rem; max-height: 10rem;">' +
      '<div class="card-header">' +
      '<div class="row">' +
      '<div class="col">' +
      toDay() +
      '</div>' +
      '<div class="col text-end">' +
      '<i class="bi bi-arrow-down-square-fill"></i>' +
      '<i class="bi bi-x-square-fill"></i>' +
      '<!-- <div class="card-body">XXX</div> -->' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div class="card-body" id="b' + id + '">' +
      '<input type=text class="postItTitle" placeholder="Task Title">' +
      '<textarea type=text rows="2" cols="40" placeholder="Task details" style="max-width: 16rem;">' +
      '' +
      '</textarea>' +
      '</div>' +
      '</div>';
    id++;
    postIt.data("id", id);
    newPostIt = $(data);
    $('#postItCreator').append(newPostIt.draggable());

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

$('.bi-x-square-fill').on("click", function (e) { $(this).parentsUntil(".card").remove() })
$('.bi-arrow-down-square-fill').on("click", function (e) {

  console.log($('#b999').hide());

  $(this).next(".card-body").hide();
})


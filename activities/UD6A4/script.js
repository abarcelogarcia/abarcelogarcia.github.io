JQuery.fn.addPostIt = function (id) {

  postIt = $(this);

  postIt.data("id", id);


  postIt.on("click", function (e) {


    e.preventDefault();

    postIt = $(this);
    id = postIt.data("id");

    data = '<div class="card text-bg-primary mb-3 ui-widget-content postIt" id="' + id + '">' +
      '<div class="card-header">Header</div>' +
      '<div class="card-body">' +
      '<p class="card-text">New task body</p>' +
      '</div>' +
      '</div>';

    id++;
    postIt.data("id", id);

    newPostIt = $(data);
    postIt.append("#postItCreator");




  })


  return this;

}


$(function () {

  $(".postIt")
    .draggable();

  $('#newPostIt').addPostIt(1);


});



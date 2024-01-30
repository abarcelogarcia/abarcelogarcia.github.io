
// Global variable to control the post-it ID's
let postIt_id = 1;


$('#newPostIt').on("click", function (e) {

  e.preventDefault();

  // PostIt element
  data =
    '<li id="postIt_' + postIt_id + '">' +
    '<div class="card  text-light mb-3 ui-widget-content postIt position-relative" style="max-width: 50rem; max-height: 20rem;">' +

    '<div class="card-header border-light">' +
    '<div class="row align-items-center">' +
    '<div class="col-4">' +
    '<input type=text class="postItTitle" placeholder="Task Title" style="max-width: 45rem; color: white;" maxlength="18">' +
    '</div>' +
    '<div class="col text-end" style="font-size: 25px;">' +
    '<i class="bi bi-arrow-down-square-fill me-1" id="postItMin_' + postIt_id + '"></i>' +
    '<i class="bi bi-x-square-fill" id="postItDel_' + postIt_id + '"></i>' +
    '</div>' +
    '</div>' +

    '</div>' +

    '<div class="card-body bg-light" id="postItBody_' + postIt_id + '">' +
    '<textarea type=text rows="4" cols="50" placeholder="Task details" style="max-width: 45rem; color:black">' +
    '</textarea>' +
    '</div>' +

    '<div class="card-footer">' +
    '<div class="row align-items-center">' +
    '<div class="col-4" style="font-size: 25px;">' +
    '<i class="bi bi-arrow-left-square me-1" id="postItLeft_' + postIt_id + '"></i>' +
    '<i class="bi bi-arrow-right-square me-1" id="postItRight_' + postIt_id + '"></i>' +
    '</div>' +
    '<div class="col text-end">' +
    today() +
    '</div>' +

    '</div>' +

    '</div>' +
    '</li>';


  // Element created
  newPostIt = $(data);

  // Add data to element
  newPostIt.data("id", postIt_id);
  newPostIt.data("isDropped", 1);
  newPostIt.data("ubication", "toDo");

  // Update To Do counter
  let total = $('#toDo').data("total");
  total++;

  $('#toDo')
    .data("total", total)
    .find(".total")
    .html(total);


  // Add the new element to
  $('#toDoContainer').append(newPostIt.draggable({

    containment: "#mainContainer",
    scroll: false,
    opacity: 0.7,
    snap: ".tasksList",
    snapMode: "inner"

  }));


  // Update total Counter
  $('#totalTasks').text("#" + $(".card").length);

  // Hide/show body PostIt
  $('#postItMin_' + postIt_id).on("click", { id: newPostIt.data("id") }, function (e) {

    $('#postItBody_' + e.data.id).toggle(500);
    $(this).toggleClass(['bi-arrow-up-square-fill', 'bi-arrow-down-square-fill']);// Toggle icon

  })

  // Moving post-it with buttons (RIGHT)
  $('#postItRight_' + postIt_id).on("click", { id: newPostIt.data("id") }, function (e) {

    let postIt = $('#postIt_' + e.data.id);

    let ubication = postIt.data("ubication");

    // console.log(postIt);

    if (ubication == 'toDo') {

      postIt
        .data("isDropped", 1)
        .data("ubication", "doing")
        .css({ "top": 0, "left": 0 })
        .appendTo('#doingContainer');

      // Update Counters
      // TO DO
      let totalToDo = $('#toDo').data("total");
      totalToDo--;
      $('#toDo')
        .data("total", totalToDo)
        .find(".total")
        .html($('#toDo').data("total"))
        .effect("bounce", "slow");

      // DOING
      let totalDoing = $('#doing').data("total");
      totalDoing++;
      $('#doing')
        .data("total", totalDoing)
        .find(".total")
        .html($('#doing').data("total"))
        .effect("bounce", "slow");

    } else if (ubication == 'doing') {


      // Update Counters
      // DOING
      let totalDoing = $('#doing').data("total");
      totalDoing--;
      $('#doing')
        .data("total", totalDoing)
        .find(".total")
        .html($('#doing').data("total"))
        .effect("bounce", "slow");

      // DONE
      let totalDone = $('#done').data("total");
      totalDone++;
      $('#done')
        .data("total", totalDone)
        .find(".total")
        .html($('#done').data("total"))
        .effect("bounce", "slow");


      postIt
        .data("isDropped", 1)
        .data("ubication", "done")
        .css({ "top": 0, "left": 0 })
        .appendTo('#doneContainer');

    }


  })
  
  // Moving post-it with buttons (LEFT)
  $('#postItLeft_' + postIt_id).on("click", { id: newPostIt.data("id") }, function (e) {

    let postIt = $('#postIt_' + e.data.id);

    let ubication = postIt.data("ubication");

    // console.log(postIt);

    if (ubication == 'done') {

      postIt
        .data("isDropped", 1)
        .data("ubication", "doing")
        .css({ "top": 0, "left": 0 })
        .appendTo('#doingContainer');

      // Update Counters
      // DONE
      let totalDone = ($('#done').data("total")-1);
      $('#done')
        .data("total", totalDone)
        .find(".total")
        .html($('#done').data("total"))
        .effect("bounce", "slow");

      // DOING
      let totalDoing = $('#doing').data("total");
      totalDoing++;
      $('#doing')
        .data("total", totalDoing)
        .find(".total")
        .html($('#doing').data("total"))
        .effect("bounce", "slow");

    } else if (ubication == 'doing') {


      postIt
        .data("isDropped", 1)
        .data("ubication", "toDo")
        .css({ "top": 0, "left": 0 })
        .appendTo('#toDoContainer');


      // Update Counters
      // DOING
      let totalDoing = $('#doing').data("total");
      totalDoing--;
      $('#doing')
        .data("total", totalDoing)
        .find(".total")
        .html($('#doing').data("total"))
        .effect("bounce", "slow");

      // To DO
      let totalToDo = $('#toDo').data("total");
      totalToDo++;
      $('#toDo')
        .data("total", totalToDo)
        .find(".total")
        .html($('#toDo').data("total"))
        .effect("bounce", "slow");


    }


  })


  // Delete PostIt
  $('#postItDel_' + postIt_id).on("click", { id: newPostIt.data("id") }, function (e) {


    let postIt = $('#postIt_' + e.data.id);

    $("#dialog-confirm").dialog({
      resizable: false,
      height: "auto",
      width: 400,
      modal: true,
      buttons: {
        "Delete the task": function () {

          let ubication = '#' + postIt.data("ubication");

          // Update container counter
          let total = $(ubication).data("total");
          total--;
          $(ubication)
            .data("total", total)
            .find(".total")
            .html($(ubication).data("total"));

          // Update Total counter
          // console.log($(".card").length);
          $('#totalTasks').text("#" + ($(".card").length - 1));

          // Remove Post-it
          postIt
            .effect("explode", "", 500)
            .remove();

          $(this).dialog("close");


        },

        Cancel: function () {
          $(this).dialog("close");
        }
      }
    });



  });

  // Update Post_id
  postIt_id++;

})




$(".tasksContainer").droppable({

  drop: function (event, ui) {

    // Get the dropped element
    let droppedPostIt = ui.draggable;

    // Condition (isDropped) to avoid updating the counter if it is the same container
    if (droppedPostIt.data("isDropped") == 0) {

      // Update Counter
      let total = $(this).data("total");
      total++;
      $(this)
        .data("total", total)
        .find(".total")
        .html($(this).data("total"))
        .effect("bounce", "slow");



      // Update PostIt dropped status & position
      $(droppedPostIt)
        .data("isDropped", 1)
        .data("ubication", $(this).attr("id"))
        .css({ "top": 0, "left": 0 })
        .appendTo('#' + droppedPostIt.data("ubication") + 'Container');



      // Auto-close if the tasks is done
      if (droppedPostIt.data("ubication") == "done") {

        $('#postItBody_' + droppedPostIt.data("id")).hide(500);
        $('#postItMin_' + droppedPostIt.data("id")).removeClass('bi-arrow-down-square-fill');
        $('#postItMin_' + droppedPostIt.data("id")).addClass('bi-arrow-up-square-fill');

      }


    }
  },

  out: function (event, ui) {

    // Get dropped element
    let droppedPostIt = ui.draggable;

    // Condition (isDropped) to avoid updating the counter if it is the same container
    if ($(droppedPostIt).data("isDropped") == 1) {

      // Update counter
      let total = $(this).data("total");
      total--;
      $(this)
        .data("total", total)
        .find(".total")
        .html($(this).data("total"))
        .effect("bounce", "slow");

      // Update PostIt dropped status
      $(droppedPostIt).data("isDropped", 0);


    }

  }
});



// TOOLS

// function returning the current date in a specified format (dd/mm/yyyy)
function today() {

  var d = new Date();
  var month = d.getMonth() + 1;
  var day = d.getDate();

  var output =

    (day < 10 ? '0' : '') + day + '/' +
    (month < 10 ? '0' : '') + month + '/' +
    d.getFullYear();

  return output;

}


// Minimise all Post-It
$('#minAll').on("click", function () {
  $('.card-body').hide(500);
  $('.bi-arrow-up-square-fill').toggleClass(['bi-arrow-up-square-fill', 'bi-arrow-down-square-fill']);
});

// Maximise all Post-It
$('#maxAll').on("click", function () {
  $('.card-body').show(500);
  $('.bi-arrow-down-square-fill').toggleClass(['bi-arrow-up-square-fill', 'bi-arrow-down-square-fill']);
});
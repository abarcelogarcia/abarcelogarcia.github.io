
// Global variable to control the post-it ID's
let postIt_id = 1;


$('#newPostIt').on("click", function (e) {

  e.preventDefault();

  // PostIt element
  data =
    '<li id="postIt_' + postIt_id + '" class="toDo">' +
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

  // Update To Do Counter
  $("#total_toDo")
    .html($(".toDo").length)
    .effect("bounce", "slow");

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
        .removeClass("toDo done")
        .addClass("doing")
        .css({ "top": 0, "left": 0 })
        .appendTo('#doingContainer');

      // Update Counters
      // TO DO
      $("#total_toDo")
        .html($(".toDo").length)
        .effect("bounce", "slow");

      // DOING
      $("#total_doing")
        .html($(".doing").length)
        .effect("bounce", "slow");

    } else if (ubication == 'doing') {

      postIt
        .data("isDropped", 1)
        .data("ubication", "done")
        .removeClass("toDo doing")
        .addClass("done")
        .css({ "top": 0, "left": 0 })
        .appendTo('#doneContainer');


      // Update Counters
      // DOING
      $("#total_doing")
        .html($(".doing").length)
        .effect("bounce", "slow");

      // DONE
      $("#total_done")
        .html($(".done").length)
        .effect("bounce", "slow");




    }


  })

  // Moving post-it with buttons (LEFT)
  $('#postItLeft_' + postIt_id).on("click", { id: newPostIt.data("id") }, function (e) {

    let postIt = $('#postIt_' + e.data.id);

    let ubication = postIt.data("ubication");

    if (ubication == 'done') {

      postIt
        .data("isDropped", 1)
        .data("ubication", "doing")
        .removeClass("toDo done")
        .addClass("doing")
        .css({ "top": 0, "left": 0 })
        .appendTo('#doingContainer');

      // Update Counters
      // DONE
      $("#total_done")
        .html($(".done").length)
        .effect("bounce", "slow");

      // DOING
      $("#total_doing")
        .html($(".doing").length)
        .effect("bounce", "slow");


    } else if (ubication == 'doing') {


      postIt
        .data("isDropped", 1)
        .data("ubication", "toDo")
        .removeClass("doing done")
        .addClass("toDo")
        .css({ "top": 0, "left": 0 })
        .appendTo('#toDoContainer');


      // Update Counters
      // DOING
      $("#total_doing")
        .html($(".doing").length)
        .effect("bounce", "slow");

      // To DO
      $("#total_toDo")
        .html($(".toDo").length)
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

          let total = "#total_" + postIt.data("ubication");
          let claseTotal = "." + postIt.data("ubication");

          // Update counter from deleted post-it
          $(total).html(($(claseTotal).length) - 1);


          // Update Total counter
          $('#totalTasks').text("#" + ($(".card").length - 1));

          // Remove Post-it
          postIt.effect("explode", "", 1000)

          setTimeout(function () { postIt.remove() }, 1000)

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




$("#toDo").droppable({

  accept: ".doing, .toDo",

  drop: function (event, ui) {

    // Get the dropped element
    let droppedPostIt = ui.draggable;

    // Condition (isDropped) to avoid updating the counter if it is the same container
    if (droppedPostIt.data("isDropped") == 0) {

      // Update PostIt dropped status & position
      $(droppedPostIt)
        .data("isDropped", 1)
        .css({ "top": 0, "left": 0 })
        .removeClass("doing done")
        .addClass("toDo")
        .appendTo('#toDoContainer');

      // Update Counters
      $("#total_toDo")
        .html($(".toDo").length)
        .effect("bounce", "slow");

      $("#total_doing").html($(".doing").length);
      $("#total_done").html($(".done").length);



    }
  },

  out: function (event, ui) {

    // Get dropped element
    let droppedPostIt = ui.draggable;

    // Condition (isDropped) to avoid updating the counter if it is the same container
    if ($(droppedPostIt).data("isDropped") == 1) {

      // Update PostIt dropped status
      $(droppedPostIt)
        .data("isDropped", 0);

    }

  }
});

$("#doing").droppable({

  drop: function (event, ui) {

    // Get the dropped element
    let droppedPostIt = ui.draggable;

    // Condition (isDropped) to avoid updating the counter if it is the same container
    if (droppedPostIt.data("isDropped") == 0) {

      // Update PostIt dropped status & position
      $(droppedPostIt)
        .data("isDropped", 1)
        .data("ubication", $(this).attr("id"))
        .css({ "top": 0, "left": 0 })
        .removeClass("toDo done")
        .addClass("doing")
        .appendTo('#doingContainer');

      // Update Counters
      $("#total_toDo").html($(".toDo").length);

      $("#total_doing")
        .html($(".doing").length)
        .effect("bounce", "slow");

      $("#total_done").html($(".done").length);

    }
  },

  out: function (event, ui) {

    // Get dropped element
    let droppedPostIt = ui.draggable;

    // Condition (isDropped) to avoid updating the counter if it is the same container
    if ($(droppedPostIt).data("isDropped") == 1) {

      // Update PostIt dropped status
      $(droppedPostIt).data("isDropped", 0);
    }

  }
});
$("#done").droppable({

  accept: ".doing, .done",

  drop: function (event, ui) {

    // Get the dropped element
    let droppedPostIt = ui.draggable;

    // Condition (isDropped) to avoid updating the counter if it is the same container
    if (droppedPostIt.data("isDropped") == 0) {


      // Update PostIt dropped status & position
      $(droppedPostIt)
        .data("isDropped", 1)
        .data("ubication", $(this).attr("id"))
        .css({ "top": 0, "left": 0 })
        .removeClass("toDo doing")
        .addClass("done")
        .appendTo('#doneContainer');

      // Update Counter

      $("#total_toDo").html($(".toDo").length);
      $("#total_doing").html($(".doing").length);
      $("#total_done")
        .html($(".done").length)
        .effect("bounce", "slow");



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

      // Update PostIt dropped status
      $(droppedPostIt)
        .data("isDropped", 0);

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
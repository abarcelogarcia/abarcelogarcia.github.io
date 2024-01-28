
let postIt_id = 1;


$('#newPostIt').on("click", function (e) {
    e.preventDefault();
    
    // Elemento postIt
    data = 
    '<li id="postIt_' + postIt_id + '">'+
      '<div class="card text-bg-primary mb-3 ui-widget-content postIt position-relative" style="max-width: 18rem; max-height: 15rem;">' +
      
      '<div class="card-header border-light">' +
        '<div class="row align-items-center">' +
          '<div class="col-4">' +
            '<input type=text class="postItTitle" placeholder="Task Title" style="max-width: 12rem">' +
          '</div>' +
          '<div class="col text-end">' +
            '<i class="bi bi-arrow-up-square-fill me-1" id="postItMin_' + postIt_id + '"></i>' +
            '<i class="bi bi-x-square-fill" id="postItDel_' + postIt_id + '"></i>' +
          '</div>' +
        '</div>' +
      '</div>' +
        
      '<div class="card-body" id="postItBody_' + postIt_id + '">' +
        '<textarea type=text rows="4" cols="40" placeholder="Task details" style="max-width: 16rem;">' +
        '</textarea>' +
      '</div>' +
      
      '<div class="card-footer text-end border-light" style="font-size: 12px;">' +
      toDay() +
      '</div>' +

    '</div>'+
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
      .find( ".total" )
      .html( total );


    // Add the new element to
    $('#toDoContainer').append(newPostIt.draggable({ 
      
      opacity: 0.7,
      snap: ".tasksList",
      snapMode: "inner"
    
    }));


    $('#totalTasks').text("#" + $(".card").length);


 
    // Hide body PostIt
    $('#postItMin_' + postIt_id).on(
      
      "click",
      
      {id: newPostIt.data("id")},
      
      function (e) {

      $('#postItBody_' + e.data.id).toggle(500);
      $(this).toggleClass(['bi-arrow-up-square-fill', 'bi-arrow-down-square-fill']);
      
    })


    // Delete PostIt
    $('#postItDel_' + postIt_id).on("click", {id: newPostIt.data("id")}, function (e) {

      let postIt = $('#postIt_'+ e.data.id);
      

      $("#dialog-confirm").dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        buttons: {
          "Delete the task": function () {

            let ubication = '#' + postIt.data("ubication"); 


        // Update counter
        let total = $(ubication).data("total");
        total--;
        $(ubication)
          .data("total", total)
          .find( ".total" )
          .html( $(ubication).data("total"));

        // Remove Post-it
        postIt.remove();
        $('#totalTasks').text("#" + $(".card").length);

        $(this).dialog("close");
        },
        
        Cancel: function () {
            $(this).dialog("close");
          }
        }
      });
    
    
    
    });

    postIt_id++;

  })



$( ".tasksContainer" ).droppable({
  
  drop: function( event, ui ) {

    // Get the dropped element
    let droppedPostIt = ui.draggable;
    
    // Condition (isDropped) to avoid updating the counter if it is the same container
    if(droppedPostIt.data("isDropped") == 0){
      
      // Update Counter
      let total = $(this).data("total");
      total++;
      $(this)
      .data("total", total)
      .find( ".total" )
      .html( $(this).data("total") )
      .css("animation", "vibrate 0.3s 2");


      
      // Update PostIt dropped status & position
      $(droppedPostIt)
      .data("isDropped", 1)
      .data("ubication", $(this).attr("id"))
      .css({"top": 0, "left":0})
      .appendTo('#'+droppedPostIt.data("ubication") + 'Container')

    }
  },
  
  out: function(event, ui){
    
    // Get dropped element
    let droppedPostIt = ui.draggable;

    // Condition (isDropped) to avoid updating the counter if it is the same container
    if($(droppedPostIt).data("isDropped") == 1){

      // Update counter
      let total = $(this).data("total");
      total--;
      $(this)
        .data("total", total)
        .find( ".total" )
        .html( $(this).data("total"));

      // Update PostIt dropped status
      $(droppedPostIt).data("isDropped", 0);

      
    }
      
  } 
});



// TOOLS


// Función para obtener la fecha de hoy
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
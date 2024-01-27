
let postIt_id = 1;
  





$('#newPostIt').on("click", function (e) {
    e.preventDefault();
    
    // Elemento postIt
    data = 
    '<div class="card text-bg-primary mb-3 ui-widget-content postIt" id="postIt_' + postIt_id + '" style="max-width: 18rem; max-height: 15rem;">' +
      
      '<div class="card-header">' +
        '<div class="row align-items-center">' +
          '<div class="col-4">' +
            '<input type=text class="postItTitle" placeholder="Task Title" style="max-width: 12rem">' +
          '</div>' +
          '<div class="col text-end">' +
            '<i class="bi bi-arrow-down-square-fill me-1" id="postItMin_' + postIt_id + '"></i>' +
            '<i class="bi bi-x-square-fill"></i>' +
          '</div>' +
        '</div>' +
      '</div>' +
        
      '<div class="card-body" id="postItBody_' + postIt_id + '">' +
        '<textarea type=text rows="4" cols="40" placeholder="Task details" style="max-width: 16rem;">' +
        '</textarea>' +
      '</div>' +
      
      '<div class="card-footer text-end" style="font-size: 12px;">' +
      toDay() +
      '</div>' +

    '</div>';
    
    
    // Element created
    newPostIt = $(data);

    // Add data to element
    newPostIt.data("id", postIt_id);
    newPostIt.data("isDropped", 1);

    // Update To Do counter
    let total = $('#toDo').data("total");
    total++;
    
    $('#toDo')
      .data("total", total)
      .find( ".total" )
      .html( total );

    // Add the new element to
    $('#postItCreator').append(newPostIt.draggable({ snap: true, opacity: 0.7}));

    // Hide body PostIt
    $('#postItMin_' + postIt_id + '').on("click", {id: newPostIt.data("id")},function (e) {
      $('#postItBody_' + e.data.id).toggle(500);
      
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

   


    postIt_id++;


  })





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
      
      // Update PostIt dropped status
      $(droppedPostIt).data("isDropped", 1);
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



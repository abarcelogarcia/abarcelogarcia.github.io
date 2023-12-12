function loadCanvasContext(idCanvas){
    var element = document.getElementById(idCanvas);
    if(element && element.getContext){
       var context = element.getContext('2d');
       if(context){
          return context;
       }
    }
    return false;
  }

  var ctx = loadCanvasContext('canvas_graphic');

  ctx.beginPath();
  ctx.MoveTo




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
  ctx.font = "20px Arial";
  ctx.fillText("Units", 20, 240);

   // 0.0 coordinate of the graph
  ctx.moveTo(80,400);

  // vertical line
  ctx.lineTo(80,1);

//   arrowhead
  ctx.lineTo(70,10);
  ctx.moveTo(80,1);
  ctx.lineTo(90,10);

//   horizontal line
  ctx.moveTo(80,400);
  ctx.lineTo(479,400);

//  arrowhead
  ctx.lineTo(470,390);
  ctx.moveTo(479,400);
  ctx.lineTo(470,410);
  
  ctx.stroke();
  

  // Create gradient
var grd = ctx.createLinearGradient(100, 400, 170, -100);
grd.addColorStop(0, "orange");
grd.addColorStop(1, "white");
// Fill with gradient
ctx.fillStyle = grd;
ctx.fillRect(100, 400, 70, -150);

   // Create gradient
var grd2 = ctx.createLinearGradient(200, 400, 200, 400);
grd2.addColorStop(0, "red");
grd2.addColorStop(1, "white");
// Fill with gradient
ctx.fillStyle = grd2;

  ctx.fillRect(200, 400, 70, -140);
//   ctx.fillRect(300, 400, 70, -250);







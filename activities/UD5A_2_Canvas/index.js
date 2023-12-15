// DATA

var sales = [{
  product: "Tennis",
  units: 30
}, {
  product: "Badminton",
  units: 350
}, {
  product: "Squash",
  units: 100
}];



function loadCanvasContext(idCanvas) {
  var element =  /** @type {HTMLCanvasElement} */ (document.getElementById(idCanvas));
  if (element && element.getContext) {
    var context = element.getContext('2d');
    if (context) {
      return context;
    }
  }
  return false;
}

var ctx = loadCanvasContext('canvas_graphic');

ctx.font = "20px Arial bold";
ctx.fillText("Units", 20, 240);
ctx.fillText(sales[0].product, 95, 420);
ctx.fillText(sales[1].product, 195, 420);
ctx.fillText(sales[2].product, 295, 420);
ctx.fillText("Product", 235, 450);




ctx.beginPath();

// 0.0 coordinate of the graph
ctx.moveTo(80, 400);

// print vertical line (Units)
ctx.lineTo(80, 1);

//   arrowhead
ctx.lineTo(75, 5);
ctx.moveTo(80, 1);
ctx.lineTo(85, 5);

// 0.0 coordinate of the graph
ctx.moveTo(80, 400);

// horizontal line (Product)
ctx.lineTo(479, 400);

//  arrowhead
ctx.lineTo(475, 395);
ctx.moveTo(479, 400);
ctx.lineTo(475, 405);

ctx.stroke();


// BAR GRAPHIC 1
// Create gradient
var grd = ctx.createLinearGradient(100, 399, 170, 399);
grd.addColorStop(0, "orange");
grd.addColorStop(1, "white");
// Fill with gradient
ctx.fillStyle = grd;
ctx.fillRect(100, 399, 70, -(sales[0].units));



// BAR GRAPHIC 2
// Create gradient
var grd = ctx.createLinearGradient(200, 399, 270, 399);
grd.addColorStop(0, "blue");
grd.addColorStop(1, "white");
// Fill with gradient
ctx.fillStyle = grd;
ctx.fillRect(200, 399, 70, -(sales[1].units));

// BAR GRAPHIC 3
// Create gradient
var grd = ctx.createLinearGradient(300, 399, 370, 399);
grd.addColorStop(0, "red");
grd.addColorStop(1, "white");
// Fill with gradient
ctx.fillStyle = grd;

ctx.fillRect(300, 399, 70, -(sales[2].units));









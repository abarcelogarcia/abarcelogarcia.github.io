let canvas, context, start;
let sound = document.querySelector("#boing");
let stopStart = document.getElementById("stop_start");
let direcction = document.getElementById("direcction");
let inputX = document.getElementById("input_X");
let inputY = document.getElementById("input_Y");
let logo = document.getElementById("logo");
canvas = document.getElementById('2d-animation-canvas');
context = canvas.getContext('2d');


// Draw logo

function drawLogo(x, y) {
  context.drawImage(logo, x, y);
}

function clearCanvas() {
  canvas.width = canvas.width;
}

var logoX = 60;
var logoY = 60;
var directionX = 10;
var directionY = 10;
var logo2X = 500;
var logo2Y = 200;
var direction2X = 10;
var direction2Y = 10;

function direcctionChange() {

  directionX *= -1;
  directionY *= -1;

}

function changeValuesXY() {


  console.log(directionX);
  console.log(directionY);

  directionX = parseInt(inputX.value);
  directionY = parseInt(inputY.value);

  console.log(directionX);
  console.log(directionY);
}


function startGame() {

  stopStart.setAttribute("onclick", "stop()");
  stopStart.textContent = "Stop";

  drawLogo(logoX, logoY);
  drawLogo(logo2X, logo2Y);


  start = setInterval(function () {

    if (logoX > 575 || logoX < 0) {
      directionX *= -1;
      // sound.play();
    }

    if (logoY < 0 || logoY > 475) {
      directionY *= -1;
      // sound.play();
    }
    if (logo2X > 575 || logo2X < 0) {
      direction2X *= -1;
      // sound.play();
    }

    if (logo2Y < 0 || logo2Y > 475) {
      direction2Y *= -1;
      // sound.play();
    }
    
    if(Math.abs(logoX) == Math.abs(logo2X) && Math.abs(logoY)==Math.abs(logo2Y)){
      
      directionY *= -1;
      directionX *= -1;
      direction2Y *= -1;
      direction2X *= -1;

    }
    // if(logoY == logo2Y){
      
    //   direction2Y *= -1;

    // }

    logoX += directionX;
    logoY += directionY;
    logo2X += direction2X;
    logo2Y += direction2Y;
    clearCanvas();

    drawLogo(logoX, logoY);
    drawLogo(logo2X, logo2Y);

  }, 35);

}


function stop() {

  clearInterval(start);
  stopStart.textContent = "Continue";
  stopStart.setAttribute("onclick", "startGame()");


}


window.addEventListener('load', startGame());

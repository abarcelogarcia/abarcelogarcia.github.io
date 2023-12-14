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
var directionX = 5;
var directionY = 5;


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


  start = setInterval(function () {

    if (logoX > 575 || logoX < 0) {
      directionX *= -1;
      sound.play();
    }

    if (logoY < 0 || logoY > 475) {
      directionY *= -1;
      sound.play();
    }


    logoX += directionX;
    logoY += directionY;
    clearCanvas();

    drawLogo(logoX, logoY);

  }, 35);

}


function stop() {

  clearInterval(start);
  stopStart.textContent = "Continue";
  stopStart.setAttribute("onclick", "startGame()");


}


window.addEventListener('load', startGame());

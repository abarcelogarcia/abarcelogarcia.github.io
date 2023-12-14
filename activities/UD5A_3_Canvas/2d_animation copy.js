let canvas, context, start;
let sound = document.querySelector("#boing");
let stopStart = document.getElementById("stop_start");
let direcction = document.getElementById("direcction");
let inputX = document.getElementById("input_X");
let inputY = document.getElementById("input_Y");
let logo = document.getElementById("logo");
canvas = document.getElementById('2d-animation-canvas');
context = canvas.getContext('2d');

function draw(x, y) {
  context.fillStyle = "green";
  context.beginPath();
  context.arc(x,y,20,0,Math.PI * 2,true);
  context.fill();
}

function drawLogo(x,y){

context.drawImage(logo, x, y);


}

function drawLogo2(x,y){

context.drawImage(logo, x, y);

}

function clearCanvas() {
  canvas.width = canvas.width;
}

var ballX = 60;
var ballY = 60;
var directionX = 5;
var directionY = 5;

var LogoX = 100;
var LogoY = 100;
var directionLogoX = 5;
var directionLogoY = 5;

function direcctionChange(){

  directionX *= -1;
  directionY *= -1;

}

function changeValuesXY(){

  directionX=parseInt(inputX.value);
  directionY=parseInt(inputY.value);
 
  
}

function ver() {
  
  console.log(directionX);
  console.log(directionY);
}

function startGame() {

  stopStart.setAttribute("onclick", "stop()");
  stopStart.textContent="Stop";
  

  drawLogo(ballX, ballY);
  // drawLogo2(LogoX, LogoY);
  
  
  start = setInterval(function(){
    
    if (ballX > 575 || ballX < 0){
      directionX *= -1;
      sound.play();
    }
    
    if (ballY < 0 || ballY > 475){
      directionY *= -1;
      sound.play();
    }
    
   
    
    if (LogoX > 575 || LogoX < 0){
      directionLogoX *= -1;
      sound.play();
    }
    
    if (LogoY < 0 || LogoY > 475){
      directionLogoY *= -1;
      sound.play();
    }
    
    ballX += directionX;
    ballY += directionY;
    LogoX += directionLogoX;
    ballY += directionLogoY;
    clearCanvas();
    
    
    
    drawLogo(ballX, ballY);
    // drawLogo2(LogoX, LogoY);

}, 35);

}


function stop(){

  clearInterval(start);
  stopStart.textContent="Continue";
  stopStart.setAttribute("onclick", "startGame()");


} 


window.addEventListener('load', startGame());

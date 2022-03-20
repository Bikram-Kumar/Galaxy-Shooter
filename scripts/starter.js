var cnvs = document.getElementById("cnvs");
var gameArea = document.getElementById("gameArea");
var scoreDisplay = document.querySelector("#scoreHead > span");
var score = 0;
var controlMode = 2;
var ctx = cnvs.getContext("2d");
var animationBucket = [];
var intervalControls = [];
var audioContext = new (window.AudioContext || window.webkitAudioContext) ();


var time1, time2, deltaTime;
function startGame(timeSinceStart) {
  ctx.beginPath();
  ctx.clearRect(0, 0, cnvs.width, cnvs.height);
  handleDrawingObjects();
  animationBucket.forEach(function (item) {
    item.draw();
  }
  );
  detectCollisions();

  if (!timeSinceStart) {
    timeSinceStart = 0;
  }
  if (!time1) {
    time1 = timeSinceStart;
  }
  time2 = timeSinceStart;
  deltaTime = (time2 - time1) / 20;
  time1 = time2;

  callerOfAnimationStarter = requestAnimationFrame(startGame);
}

createArrayBuffer('bulletSound.wav', 'bulletSound');


window.ondblclick = function (e) {
  e.preventDefault();
  gameArea.requestFullscreen();
}
window.onresize = window.onorientationchange = function() {
  fitCanvasToScreen();
}
window.onload = function () {
  //  controlMode = prompt("Choose control: 1.Touch Screen OR 2.Buttons", 2);
  fitCanvasToScreen();
  animationBucket.push(whiteShip);
  setInterval(sendEnemies, 900);
  bulletImage = ImageObject(imageFolder + "bullet.png");
  ufoImage = ImageObject(imageFolder + "ufo.png");
  whiteShipImage = ImageObject(imageFolder + "whiteShip.png");

  setTimeout(startGame, 500);
  if (controlMode == 1) {
    deployTouchScreenMode();
  }
}
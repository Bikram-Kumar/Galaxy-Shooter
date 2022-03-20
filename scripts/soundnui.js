function updateScore() {
  scoreDisplay.innerHTML = "Score: " + score;
}
function createArrayBuffer(soundFile, soundVar) {
  var request = new XMLHttpRequest();
  request.open('GET',
    'assets/sounds/'+ soundFile,
    true);
  request.responseType = 'arraybuffer';
  request.send();
  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      audioContext.decodeAudioData(request.response, function(buffer) {
        eval(soundVar + '=' + 'buffer');
      }
      );
    }
  }
}
function playSound(soundFile) {
  var source = audioContext.createBufferSource();
  source.buffer = soundFile;
  source.connect(audioContext.destination);
  source.start(0);
}
function deployTouchScreenMode() {
  gameArea.addEventListener("touchstart", handleTouchStart);

  gameArea.ontouchend = cnvs.ontouchcancel = function() {
    clearInterval(callerOfCNVSTouchStart);
    gameArea.addEventListener("touchstart", handleTouchStart);
    shoot(true);
  }

  gameArea.ontouchmove = function (e) {
    e.preventDefault()

  }
}
function handleTouchStart(event) {
  event.preventDefault();
  gameArea.removeEventListener("touchstart", handleTouchStart);
  var x1 = event.touches[0].clientX-cnvs.offsetLeft;
  callerOfCNVSTouchStart = setInterval(function () {
    if (x1 > cnvs.width/2 && whiteShip.x2 < cnvs.width/scaleFactor) {
      whiteShip.x1 += 3;
    } else if (x1 < cnvs.width/2 && whiteShip.x1 > 0) {
      whiteShip.x1 -= 3;
    }
  },
    20);
  shoot(false);
}
function fitCanvasToScreen() {
  var sW = window.innerWidth;
  var sH = window.innerHeight;

  if (sW > sH) {
    cnvs.height = sH;
    cnvs.width = 3/2 * sH;
  } else {
    cnvs.width = sW;
    cnvs.height = 2/3 * sW;
  }
  scaleFactor = (cnvs.width/480).toFixed(4); // scaleFactor = cnvs.height/320; both have same value
  document.documentElement.style.fontSize = (20 * scaleFactor) + "px";

  if (scaleFactor < 2) {
    imageFolder = "assets/sd/";
  } else {
    imageFolder = "assets/hd/";
  }
}

function animateImageSource(imgObject, imgSource, imgName, extension, numberOfFrames, frameDelay) {
  let indexForImageAnimationFrame = 1;
  setInterval(function() {
    imgObject.src = imgSource + imgName + indexForImageAnimationFrame + extension;
    indexForImageAnimationFrame++;
    if (indexForImageAnimationFrame > numberOfFrames) {
      indexForImageAnimationFrame = 1;
    }
  },
    frameDelay)
}
function ImageObject(source) {
  let tempImage = new Image();
  tempImage.src = source;
  return tempImage;
}
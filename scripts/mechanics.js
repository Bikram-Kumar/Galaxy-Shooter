var scaleFactor = 1;
class AllObjects {
  constructor(x1, y1, width) {
    this.x1 = x1;
    this.y1 = y1;
    this.width = width;
  }
  get x2() {
    return Math.round(this.x1 + this.width);
  }
  get height() {
    return Math.round(this.width * this.img.height/this.img.width);
  }
  get y2() {
    return Math.round(this.y1 + this.height);
  }

  draw() {
    let s = scaleFactor;
    ctx.drawImage(this.img, this.x1 * s, this.y1 * s, this.width * s, this.height * s);
  }
}

class HeroShip extends AllObjects {
  constructor(x1, y1, width) {
    super(x1, y1, width);
  }
  get img() {
    return whiteShipImage;
  }
}
class Bullet extends AllObjects {
  constructor(x1, y1, width) {
    super(x1, y1, width);
  }
  get img() {
    return bulletImage;
  }
}

class UFO extends AllObjects {
  constructor(x1, y1, width) {
    super(x1, y1, width);
  }
  get img() {
    return ufoImage;
  }
}

var whiteShip = new HeroShip(200, 260, 40);










function shoot(isStarted) {
  if (!isStarted) {
    makeNewBullets();
    nbmc = setInterval(makeNewBullets, 200);
  } else {
    clearInterval(nbmc);
  }
}

function makeNewBullets() {
  var bullet = new Bullet(whiteShip.x1 + whiteShip.width/2 - 3, whiteShip.y1-8, 4);
  animationBucket.push(bullet);
  playSound(bulletSound);
}
function sendEnemies() {
  var ufo = new UFO(Math.round(Math.random() * 8) * 60, -10, 40);
  animationBucket.push(ufo);
}

function decideMovements(obj) {
  if (obj instanceof UFO) {
    obj.y1 += 3 * deltaTime;
  } else if (obj instanceof Bullet) {
    obj.y1 -= 3 * deltaTime;
  }
}

function move(num, isStarted) {
  var w = whiteShip;
  switch (num) {
    case 1:
      var op = 'y1-';
      break;
    case 2:
      var op = 'x1+';
      break;
    case 3:
      var op = 'y1+';
      break;
    case 4:
      var op = 'x1-';
      break;
  }
  if (!isStarted && w.x2 > 0 && w.x1 < 480 && w.y2 > 0 && w.y1 < 320) {
    var wsmc = setInterval(function() {
      if (w.x1 > 0 && w.x2 < 480 && w.y1 > 0 && w.y2 < 320) {
        eval('w.' + op + '= 2');
      }
    },
      20);
    intervalControls.push(wsmc);
  } else {
    intervalControls.forEach((item) => {
      clearInterval(item);
    }
    );
  }
}

function detectCollisions() {
  let h = whiteShip;
  let bullets = animationBucket.filter((i) =>  i instanceof Bullet);
  let ships = animationBucket.filter((i) =>  i instanceof UFO);

  bullets.forEach(function (b) {
    ships.forEach (function (s) {
      if (b.x1 <= s.x2 && b.x2 >= s.x1 && b.y1 <= s.y2 && b.y2 >= s.y1) {
        animationBucket = animationBucket.filter((i) =>  (i != b && i != s));
        //blast here
        score += 10;
        updateScore();
      }
    }
    );
}
);
ships.forEach(function (s) {
  if (h.x1 <= s.x2 && h.x2 >= s.x1 && h.y1 <= s.y2 && h.y2 >= s.y1) {
   // stopGame();
    alert("Game Over!");
  }
}
);
}
function handleDrawingObjects() {
animationBucket.forEach(function (item) {
if (item.y2 > 0 && item.y1 < 320) {
decideMovements(item);
} else {
var itsIndex = animationBucket.indexOf(item);
animationBucket.splice(itsIndex, 1);
}
}
);
}
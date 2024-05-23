const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const shipWidth = 40;
const shipHeight = 20;
const shipSpeed = 5;
const bulletWidth = 4;
const bulletHeight = 10;
const bulletSpeed = 7;
const alienRowCount = 3;
const alienColumnCount = 8;
const alienWidth = 30;
const alienHeight = 20;
const alienPadding = 20;
const alienOffsetTop = 30;
const alienOffsetLeft = 30;

let shipX = (canvasWidth - shipWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let spacePressed = false;
let bullets = [];
let aliens = [];
let score = 0;

for (let i = 0; i < alienRowCount; i++) {
  aliens[i] = [];
  for (let j = 0; j < alienColumnCount; j++) {
    aliens[i][j] = { x: 0, y: 0, status: 1 };
  }
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
  if (e.key === "d" || e.key === "D") {
    rightPressed = true;
  } else if (e.key === "a" || e.key === "A") {
    leftPressed = true;
  } else if (e.key === " ") {
    spacePressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "d" || e.key === "D") {
    rightPressed = false;
  } else if (e.key === "a" || e.key === "A") {
    leftPressed = false;
  } else if (e.key === " ") {
    spacePressed = false;
  }
}

function drawShip() {
  context.fillStyle = "#00f";
  context.fillRect(
    shipX,
    canvasHeight - shipHeight - 10,
    shipWidth,
    shipHeight
  );
}

function drawBullets() {
  context.fillStyle = "#f00";
  for (let i = 0; i < bullets.length; i++) {
    let bullet = bullets[i];
    context.fillRect(bullet.x, bullet.y, bulletWidth, bulletHeight);
  }
}

function drawAliens() {
  context.fillStyle = "#0f0";
  for (let i = 0; i < alienRowCount; i++) {
    for (let j = 0; j < alienColumnCount; j++) {
      if (aliens[i][j].status === 1) {
        let alienX = j * (alienWidth + alienPadding) + alienOffsetLeft;
        let alienY = i * (alienHeight + alienPadding) + alienOffsetTop;
        aliens[i][j].x = alienX;
        aliens[i][j].y = alienY;
        context.fillRect(alienX, alienY, alienWidth, alienHeight);
      }
    }
  }
}

function moveShip() {
  if (rightPressed && shipX < canvasWidth - shipWidth) {
    shipX += shipSpeed;
  } else if (leftPressed && shipX > 0) {
    shipX -= shipSpeed;
  }
}

function moveBullets() {
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].y -= bulletSpeed;
    if (bullets[i].y < 0) {
      bullets.splice(i, 1);
      i--;
    }
  }
}

function collisionDetection() {
  for (let i = 0; i < bullets.length; i++) {
    for (let r = 0; r < alienRowCount; r++) {
      for (let c = 0; c < alienColumnCount; c++) {
        let alien = aliens[r][c];
        if (alien.status === 1) {
          if (
            bullets[i].x > alien.x &&
            bullets[i].x < alien.x + alienWidth &&
            bullets[i].y > alien.y &&
            bullets[i].y < alien.y + alienHeight
          ) {
            alien.status = 0;
            bullets.splice(i, 1);
            i--;
            score++;
            if (score === alienRowCount * alienColumnCount) {
              alert("You win!");
              document.location.reload();
            }
          }
        }
      }
    }
  }
}

function drawScore() {
  context.font = "16px Arial";
  context.fillStyle = "#fff";
  context.fillText("Score: " + score, 8, 20);
}

function fireBullet() {
  if (spacePressed) {
    bullets.push({
      x: shipX + shipWidth / 2 - bulletWidth / 2,
      y: canvasHeight - shipHeight - 20,
    });
  }
}

function draw() {
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  drawShip();
  drawBullets();
  drawAliens();
  drawScore();
  moveShip();
  moveBullets();
  collisionDetection();
  fireBullet();
  requestAnimationFrame(draw);
}

draw();

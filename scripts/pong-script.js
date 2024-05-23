const canvas = document.getElementById("pongCanvas");
const context = canvas.getContext("2d");

const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 10;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let leftPaddleY = (canvasHeight - paddleHeight) / 2;
let rightPaddleY = (canvasHeight - paddleHeight) / 2;
let ballX = canvasWidth / 2;
let ballY = canvasHeight / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

document.addEventListener("keydown", movePaddle);
document.addEventListener("keyup", stopPaddle);

let leftPaddleSpeed = 0;
let rightPaddleSpeed = 0;

function drawRect(x, y, width, height) {
  context.fillStyle = "#fff";
  context.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius) {
  context.fillStyle = "#fff";
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();
}

function movePaddle(e) {
  switch (e.key) {
    case "w":
    case "W":
      leftPaddleSpeed = -5;
      break;
    case "s":
    case "S":
      leftPaddleSpeed = 5;
      break;
    case "ArrowUp":
      rightPaddleSpeed = -5;
      break;
    case "ArrowDown":
      rightPaddleSpeed = 5;
      break;
  }
}

function stopPaddle(e) {
  switch (e.key) {
    case "w":
    case "W":
    case "s":
    case "S":
      leftPaddleSpeed = 0;
      break;
    case "ArrowUp":
    case "ArrowDown":
      rightPaddleSpeed = 0;
      break;
  }
}

function move() {
  leftPaddleY += leftPaddleSpeed;
  rightPaddleY += rightPaddleSpeed;

  if (leftPaddleY < 0) leftPaddleY = 0;
  if (leftPaddleY + paddleHeight > canvasHeight)
    leftPaddleY = canvasHeight - paddleHeight;
  if (rightPaddleY < 0) rightPaddleY = 0;
  if (rightPaddleY + paddleHeight > canvasHeight)
    rightPaddleY = canvasHeight - paddleHeight;

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballY - ballRadius < 0 || ballY + ballRadius > canvasHeight) {
    ballSpeedY = -ballSpeedY;
  }

  if (ballX - ballRadius < paddleWidth) {
    if (ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
      ballSpeedX = -ballSpeedX;
    } else {
      resetBall();
    }
  }

  if (ballX + ballRadius > canvasWidth - paddleWidth) {
    if (ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
      ballSpeedX = -ballSpeedX;
    } else {
      resetBall();
    }
  }
}

function resetBall() {
  ballX = canvasWidth / 2;
  ballY = canvasHeight / 2;
  ballSpeedX = -ballSpeedX;
}

function draw() {
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  drawRect(0, leftPaddleY, paddleWidth, paddleHeight);
  drawRect(canvasWidth - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);
  drawCircle(ballX, ballY, ballRadius);
}

function gameLoop() {
  move();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();

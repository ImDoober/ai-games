const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

const tileSize = 32;
const map = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
  0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0,
  1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
  0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1,
  0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];
const mapWidth = 14;
const mapHeight = 10;

let pacMan = {
  x: tileSize,
  y: tileSize,
  size: tileSize,
  speed: 2,
  dx: 0,
  dy: 0,
};

let ghosts = [
  { x: 6 * tileSize, y: 4 * tileSize, size: tileSize, speed: 2, dx: 2, dy: 0 },
  { x: 8 * tileSize, y: 4 * tileSize, size: tileSize, speed: 2, dx: -2, dy: 0 },
];

let score = 0;
let totalDots = map.reduce((acc, tile) => acc + (tile === 0 ? 1 : 0), 0);

document.addEventListener("keydown", movePacMan);
document.addEventListener("keyup", stopPacMan);

function movePacMan(e) {
  switch (e.key) {
    case "w":
    case "W":
      pacMan.dx = 0;
      pacMan.dy = -pacMan.speed;
      break;
    case "a":
    case "A":
      pacMan.dx = -pacMan.speed;
      pacMan.dy = 0;
      break;
    case "s":
    case "S":
      pacMan.dx = 0;
      pacMan.dy = pacMan.speed;
      break;
    case "d":
    case "D":
      pacMan.dx = pacMan.speed;
      pacMan.dy = 0;
      break;
  }
}

function stopPacMan(e) {
  switch (e.key) {
    case "w":
    case "W":
    case "a":
    case "A":
    case "s":
    case "S":
    case "d":
    case "D":
      pacMan.dx = 0;
      pacMan.dy = 0;
      break;
  }
}

function drawMap() {
  for (let row = 0; row < mapHeight; row++) {
    for (let col = 0; col < mapWidth; col++) {
      const tile = map[row * mapWidth + col];
      if (tile === 1) {
        context.fillStyle = "#0000ff";
        context.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
      } else {
        context.fillStyle = "#000";
        context.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
        if (tile === 0) {
          context.fillStyle = "#fff";
          context.beginPath();
          context.arc(
            col * tileSize + tileSize / 2,
            row * tileSize + tileSize / 2,
            tileSize / 8,
            0,
            Math.PI * 2
          );
          context.fill();
        }
      }
    }
  }
}

function drawPacMan() {
  context.fillStyle = "#ff0";
  context.beginPath();
  context.arc(
    pacMan.x + tileSize / 2,
    pacMan.y + tileSize / 2,
    tileSize / 2,
    0.25 * Math.PI,
    1.75 * Math.PI
  );
  context.lineTo(pacMan.x + tileSize / 2, pacMan.y + tileSize / 2);
  context.fill();
}

function drawGhosts() {
  context.fillStyle = "#f00";
  for (let ghost of ghosts) {
    context.fillRect(ghost.x, ghost.y, ghost.size, ghost.size);
  }
}

function updatePacMan() {
  let newX = pacMan.x + pacMan.dx;
  let newY = pacMan.y + pacMan.dy;
  let row = Math.floor(newY / tileSize);
  let col = Math.floor(newX / tileSize);

  if (map[row * mapWidth + col] !== 1) {
    pacMan.x = newX;
    pacMan.y = newY;
  }

  if (map[row * mapWidth + col] === 0) {
    map[row * mapWidth + col] = -1;
    score++;
    if (score === totalDots) {
      alert("You win!");
      document.location.reload();
    }
  }
}

function updateGhosts() {
  for (let ghost of ghosts) {
    let newX = ghost.x + ghost.dx;
    let newY = ghost.y + ghost.dy;
    let row = Math.floor(newY / tileSize);
    let col = Math.floor(newX / tileSize);

    if (map[row * mapWidth + col] !== 1) {
      ghost.x = newX;
      ghost.y = newY;
    } else {
      ghost.dx = -ghost.dx;
      ghost.dy = -ghost.dy;
    }

    if (
      Math.abs(pacMan.x - ghost.x) < tileSize / 2 &&
      Math.abs(pacMan.y - ghost.y) < tileSize / 2
    ) {
      alert("Game Over!");
      document.location.reload();
    }
  }
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawMap();
  drawPacMan();
  drawGhosts();
  updatePacMan();
  updateGhosts();
  requestAnimationFrame(draw);
}

draw();
